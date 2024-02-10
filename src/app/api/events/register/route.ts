import prisma from 'prisma';
import { getErrorMessage, getMembershipYear } from 'src/lib/utils';
import { isEmpty } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const userId: string = isEmpty(searchParams.get("userId")) ? '' : searchParams.get("userId") as string;
  const eventId = isEmpty(searchParams.get("eventId")) ? 0 : Number(searchParams.get("eventId"));

  const token = await getToken({ req: req });
  if (!token || !token?.user) {
    return NextResponse.json("Unathorized", { status: 401 });
  }
  if (userId !== token?.id) {
    return NextResponse.json("Cannot register event for another user",{ status: 401 });
  }

  try {
    const event = await prisma.event.findFirst({
      where:
        token?.role === 'ADMIN'
          ? {
              id: Number(eventId),
            }
          : {
              id: Number(eventId),
              isDraft: false,
            },
      include: {
        registrationList: {
          select: {
            userId: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        waitingList: {
          select: {
            userId: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        attendanceList: token?.role === "ADMIN",
      },
    });
    if (!event) throw new Error(`Could not find event with id ${eventId}`);

    // Check for user membership on events with MEMBERSHIP as eventType
    if (event.eventType === 'MEMBERSHIP') {
      // Retrieve all of user's memberships
      const userMembership = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          membership: true,
        },
      });
      const memberships = userMembership?.membership || [];
      // Check if user have membership for the following year, throw if not
      if (!memberships.map((m) => m.year).includes(getMembershipYear())) {
        throw new Error('Event requires user to have membership');
      }
    }

    const hasRegistration = event.registrationList
      .map((r) => r.userId)
      .includes(userId);
    const hasWaiting = event.waitingList.map((r) => r.userId).includes(userId);
    const maxRegistrations = event.maxRegistrations || Infinity;

    let message = '';
    if (hasWaiting) {
      // Check for cancellation deadline
      if (new Date() >= event.cancellationDeadline) {
        throw new Error(`Cancellation deadline has passed for event`);
      }

      // If user is in waiting list
      await prisma.waiting.delete({
        where: {
          userId_eventId: {
            userId: event.waitingList[0].userId,
            eventId: Number(eventId),
          },
        },
      });
    } else if (hasRegistration) {
      // Check for cancellation deadline
      if (new Date() >= event.cancellationDeadline) {
        throw new Error(`Cancellation deadline has passed for event`);
      }

      // If user is in registration list
      await prisma.registrations.delete({
        where: {
          userId_eventId: {
            userId: userId,
            eventId: Number(eventId),
          },
        },
      });
      message = `Successfully unregistered for event ${eventId}`;
      // Push user from waitingList to registrationList if there is a spot available due to deletion
      if (event.waitingList.length > 0) {
        // Pop user from waiting list
        const deleted = await prisma.waiting.delete({
          where: {
            userId_eventId: {
              userId: event.waitingList[0].userId,
              eventId: Number(eventId),
            },
          },
        });
        // Push user to registration list
        await prisma.registrations.create({
          data: {
            eventId: Number(eventId),
            userId: deleted.userId,
          },
        });
        message += `. Spot found, moving a user from waiting to registered`;
      }
    } else {
      // Check for registration deadline
      if (new Date() >= event.registrationDeadline) {
        throw new Error(`Registration deadline has passed for event`);
      }

      // If user is not in waiting or registration list
      if (event.registrationList.length >= maxRegistrations) {
        // Push user to waitingList if registrationList is full
        await prisma.waiting.create({
          data: {
            eventId: Number(eventId),
            userId: userId,
          },
        });
        message = `Successfully registered for event ${eventId}. Event is currently full, adding user to the waiting list`;
      } else {
        // Push user directly to registrationList
        await prisma.registrations.create({
          data: {
            eventId: Number(eventId),
            userId: userId,
          },
        });
        message = `Successfully registered for event ${eventId}`;
      }
    }
    return NextResponse.json({message: message}, { status: 200 })
  } catch (error) {
    console.error('[api] /api/events', getErrorMessage(error));
    return NextResponse.json({ message: getErrorMessage(error) }, { status: 500 });
  }
};

const GET = async (req: NextRequest) => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
}

export { POST, GET }
