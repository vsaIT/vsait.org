import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getSession } from '@lib/auth/session';

type RegisterBodyType = {
  userId: string;
  eventId: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }
  const { userId, eventId }: RegisterBodyType = req.body;
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

    const registrationUserIds = event.registrationList.map((r) => r.userId);
    const hasRegistration = registrationUserIds.includes(userId);
    const hasWaiting = event.waitingList.map((r) => r.userId).includes(userId);
    const maxRegistrations = event.maxRegistrations || Infinity;
    console.log(hasRegistration);

    let message = '';
    if (hasWaiting) {
      await prisma.waiting.delete({
        where: {
          userId_eventId: {
            userId: event.waitingList[0].userId,
            eventId: Number(eventId),
          },
        },
      });
    } else if (hasRegistration) {
      await prisma.registrations.delete({
        where: {
          userId_eventId: {
            userId: userId,
            eventId: Number(eventId),
          },
        },
      });
      // Push from waitingList to registrationList
      message = `Successfully unregistered for event ${eventId}`;
      if (event.waitingList.length > 0) {
        const deleted = await prisma.waiting.delete({
          where: {
            userId_eventId: {
              userId: event.waitingList[0].userId,
              eventId: Number(eventId),
            },
          },
        });
        await prisma.registrations.create({
          data: {
            eventId: Number(eventId),
            userId: deleted.userId,
          },
        });
        message += `. Spot found, moving a user from waiting to registered`;
      }
    } else {
      // Push to waitingList if registrationList is full
      if (event.registrationList.length >= maxRegistrations) {
        await prisma.waiting.create({
          data: {
            eventId: Number(eventId),
            userId: userId,
          },
        });
        message = `Successfully registered for event ${eventId}. Event is currently full, adding user to the waiting list`;
      } else {
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
  } catch (error: any) {
    console.error('[api] /api/events', error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default handler;
