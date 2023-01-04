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
    const hasRegistration = await prisma.registrations.findFirst({
      where: {
        userId: userId,
        eventId: Number(eventId),
      },
    });

    let message = '';
    if (hasRegistration) {
      await prisma.registrations.delete({
        where: {
          userId_eventId: {
            userId: userId,
            eventId: Number(eventId),
          },
        },
      });
      message = `Successfully unregistered for event ${eventId}`;
    } else {
      await prisma.registrations.create({
        data: {
          eventId: Number(eventId),
          userId: userId,
        },
      });
      message = `Successfully registered for event ${eventId}`;
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
