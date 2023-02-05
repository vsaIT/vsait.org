import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getErrorMessage } from '@lib/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await prisma.user.findMany({
          include: {
            membership: true,
          },
        });
        return res.status(200).json(users);
      } catch (error) {
        return res
          .status(500)
          .json({ statusCode: 500, message: getErrorMessage(error) });
      }
  }
};

export default handler;
