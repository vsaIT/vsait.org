import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma';
import { getErrorMessage } from 'src/lib/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        const [users, userCount] = await prisma.$transaction([
          prisma.user.findMany({
            include: {
              membership: true,
            },
            skip: (Number(query.page) - 1) * 9,
            take: 9,
          }),
          prisma.user.count(),
        ]);
        res.setHeader('Cache-Control', 'max-age=120');
        return res.status(200).json({ users, userCount });
      } catch (error) {
        return res
          .status(500)
          .json({ statusCode: 500, message: getErrorMessage(error) });
      }
  }
};

export default handler;
