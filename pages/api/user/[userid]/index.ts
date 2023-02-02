import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getErrorMessage } from '@lib/utils';
import { getSession } from '@lib/auth/session';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const userID = query.userid as string;
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
    case 'GET':
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: userID,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            birthdate: true,
            foodNeeds: true,
            student: true,
            publicProfile: true,
            membership: true,
            profileIconSeed: true,
          },
        });
        return res.status(200).json(user);
      } catch (error) {
        console.error(`[api] /api/user`, getErrorMessage(error));
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
