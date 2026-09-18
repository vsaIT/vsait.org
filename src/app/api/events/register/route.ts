import prisma from 'prisma/index';
import { getErrorMessage, getMembershipYear } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { requireSelfOrAdmin } from '../../utils';

const POST = async (req: NextRequest) => {
  const body = await req.json();
  const userId = body.userId;
  const eventId = Number(body.eventId);

  const token = await getToken({ req: req });
  const isAdmin = token?.role === 'ADMIN';
  const authResponse = await requireSelfOrAdmin(req, userId);
  if (authResponse) return authResponse;

  try {
    if (!Number.isInteger(eventId)) {
      throw new Error(`Could not find event with id ${body.eventId}`);
    }

    const message = await prisma.$transaction(
      async (tx) => {
        // Every sign-up, cancellation and promotion for an event takes this lock on its row first.
        const locked = await tx.$queryRaw<{ id: number }[]>`
          SELECT id FROM "Event" WHERE id = ${eventId} FOR UPDATE
        `;
        if (!locked.length) {
          throw new Error(`Could not find event with id ${eventId}`);
        }

        const event = await tx.event.findFirst({
          where: isAdmin ? { id: eventId } : { id: eventId, isDraft: false },
          select: {
            isCancelled: true,
            eventType: true,
            maxRegistrations: true,
            registrationDeadline: true,
            cancellationDeadline: true,
          },
        });
        if (!event) throw new Error(`Could not find event with id ${eventId}`);

        // Check if event is cancelled
        if (event.isCancelled) {
          throw new Error('Event is cancelled. Modifications are disabled.');
        }

        // Check for user membership on events with MEMBERSHIP as eventType
        if (event.eventType === 'MEMBERSHIP') {
          const userMembership = await tx.user.findFirst({
            where: { id: userId },
            select: { membership: true },
          });
          const memberships = userMembership?.membership || [];
          if (!memberships.map((m) => m.year).includes(getMembershipYear())) {
            throw new Error('Event requires user to have membership');
          }
        }

        // Read under the lock, so these are still true when acted on below
        const registration = await tx.registrations.findUnique({
          where: { userId_eventId: { userId, eventId } },
        });
        const waiting = await tx.waiting.findUnique({
          where: { userId_eventId: { userId, eventId } },
        });
        const maxRegistrations = event.maxRegistrations || Infinity;
        const now = new Date();

        if (waiting) {
          if (now >= event.cancellationDeadline) {
            throw new Error(`Cancellation deadline has passed for event`);
          }
          // The user leaves their own place in the queue
          await tx.waiting.delete({
            where: { userId_eventId: { userId, eventId } },
          });
          return `Successfully removed from the waiting list for event ${eventId}`;
        }

        if (registration) {
          if (now >= event.cancellationDeadline) {
            throw new Error(`Cancellation deadline has passed for event`);
          }
          await tx.registrations.delete({
            where: { userId_eventId: { userId, eventId } },
          });
          let unregistered = `Successfully unregistered for event ${eventId}`;

          // Fill the freed place from the front of the queue
          const registered = await tx.registrations.count({
            where: { eventId },
          });
          if (registered < maxRegistrations) {
            const next = await tx.waiting.findFirst({
              where: { eventId },
              orderBy: { createdAt: 'asc' },
            });
            if (next) {
              await tx.waiting.delete({
                where: { userId_eventId: { userId: next.userId, eventId } },
              });
              await tx.registrations.create({
                data: { eventId, userId: next.userId },
              });
              unregistered += `. Spot found, moving a user from waiting to registered`;
            }
          }
          return unregistered;
        }

        if (now >= event.registrationDeadline) {
          throw new Error(`Registration deadline has passed for event`);
        }

        const registered = await tx.registrations.count({
          where: { eventId },
        });
        if (registered >= maxRegistrations) {
          await tx.waiting.create({
            data: { eventId, userId, createdAt: new Date() },
          });
          return `Successfully registered for event ${eventId}. Event is currently full, adding user to the waiting list`;
        }

        await tx.registrations.create({
          data: { eventId, userId },
        });
        return `Successfully registered for event ${eventId}`;
      },
      // Room to wait for the lock behind other sign-ups for the same event
      { maxWait: 5000, timeout: 15000 }
    );

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    console.error('[api] /api/events/register', getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

const GET = async () => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { POST, GET };
