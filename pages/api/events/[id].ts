import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getSession } from '@lib/auth/session';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getSession({ req });

  try {
    const event = await prisma.event.findFirst({
      where: {
        id: Number(id),
        isDraft: false,
      },
      include: {
        registrationList: true,
        waitingList: true,
        attendanceList: session?.user?.role === 'admin',
      },
    });
    let hasRegistration = null;
    if (session) {
      hasRegistration = await prisma.registrations.findFirst({
        where: {
          userId: session?.user?.id,
          eventId: Number(id),
        },
      });
    }
    return res
      .status(200)
      .json({ event: event, registration: !!hasRegistration });
  } catch (error: any) {
    console.error(`[api] /api/events/${id}`, error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default handler;
