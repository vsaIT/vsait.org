import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getErrorMessage } from '@lib/utils';
import { getSession } from '@lib/auth/session';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const session = await getSession({ req });

  if (!session || !session?.user || session?.user?.role !== 'ADMIN')
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
    });

  switch (method) {
    case 'GET':
      try {
        const memberships = await prisma.membership.findMany({
          orderBy: {
            year: 'desc',
          },
        });
        return res.status(200).json(memberships);
      } catch (error) {
        console.error(`[api] /api/memberships`, getErrorMessage(error));
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
