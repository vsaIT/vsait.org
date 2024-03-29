import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getErrorMessage } from '@lib/utils';
import { getSession } from '@lib/auth/session';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const userID = query.userid as string;
  const { seed } = req.body;
  const session = await getSession({ req });

  if (!session || !session?.user)
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
    });
  if (userID !== session?.user?.id && session?.user?.role !== 'ADMIN')
    return res.status(200).json({
      statusCode: 401,
      message: 'Cannot register event for another user',
    });

  switch (method) {
    case 'POST':
      try {
        if (!seed) throw new Error('Request body seed is required');

        await prisma.user.update({
          where: {
            id: userID,
          },
          data: {
            profileIconSeed: String(seed),
          },
        });
        return res.status(200).json({
          statusCode: 200,
          message: 'updated',
        });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ statusCode: 500, message: getErrorMessage(error) });
      }
    default:
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Method is not supported' });
  }
};

export default handler;
