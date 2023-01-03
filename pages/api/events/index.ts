import { NextApiRequest, NextApiResponse } from 'next';
import prisma, { Prisma } from '@db';
import isEmpty from 'lodash/isEmpty';
import { getSession } from '@lib/auth/session';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        isDraft: false,
      },
      include: {
        registrationList: true,
      },
    });
    return res.status(200).json(events);
  } catch (error: any) {
    console.error('[api] /api/events', error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default handler;
