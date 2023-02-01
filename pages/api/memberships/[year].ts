import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getErrorMessage } from '@lib/utils';
import { getSession } from '@lib/auth/session';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const year = Number(query.year as string);
  const session = await getSession({ req });

  if (!session || !session?.user || session?.user?.role !== 'ADMIN')
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
    });

  switch (method) {
    case 'GET':
      try {
        const membership = await prisma.membership.findFirst({
          where: {
            year: year,
          },
          include: {
            users: true,
          },
        });
        return res.status(200).json(membership);
      } catch (error) {
        console.error(`[api] /api/membership`, getErrorMessage(error));
        return res
          .status(500)
          .json({ statusCode: 500, message: getErrorMessage(error) });
      }
    default:
      return res
        .status(500)
        .json({ statusCode: 500, message: 'Only GET requests' });
  }
};

export default handler;
