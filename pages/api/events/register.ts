import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getSession } from '@lib/auth/session';
import { getErrorMessage } from '@lib/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Only POST requests allowed' });

  const userId: string = req?.body?.userId;
  const eventId = Number(req?.body?.eventId);

  const session = await getSession({ req });
  if (!session)
    return res.status(401).json({
      message: 'Unauthorized',
    });
  if (userId !== session?.user?.id)
    return res
      .status(401)
      .json({ message: 'Cannot register event for another user' });

  try {
    const event = await prisma.event.findFirst({
      where:
        session?.user?.role === 'ADMIN'
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
        attendanceList: session?.user?.role === 'admin',
      },
    });
    if (!event) throw new Error(`Could not find event with id ${eventId}`);

    const hasRegistration = event.registrationList
      .map((r) => r.userId)
      .includes(userId);
    const hasWaiting = event.waitingList.map((r) => r.userId).includes(userId);
    const maxRegistrations = event.maxRegistrations || Infinity;

    let message = '';
    if (hasWaiting) {
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
    return res.status(200).json({
      message: message,
    });
  } catch (error) {
    console.error('[api] /api/events', getErrorMessage(error));
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
};

export default handler;
