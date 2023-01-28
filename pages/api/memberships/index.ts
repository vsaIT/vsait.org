import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@lib/auth/session';
import prisma from '@db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session || !session?.user)
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
    });

  const memberships = await prisma.membership.findMany();

  return res.status(200).json(memberships);
};

export default handler;
