import { NextApiRequest, NextApiResponse } from 'next';
import prisma, { Prisma } from '@db';
import isEmpty from 'lodash/isEmpty';
import { getSession } from '@lib/auth/session';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getSession({ req });

  // if (!session) {
  //   return res.status(401).json({
  //     message: 'Unauthorized',
  //   });
  // }

  try {
    const events = await prisma.event.findFirst({
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
    return res.status(200).json(events);
  } catch (error: any) {
    console.error(`[api] /api/events/${id}`, error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default handler;
