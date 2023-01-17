import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getErrorMessage } from '@lib/utils';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const userID = query.userid as string;
  const { foodNeeds, student, publicProfile } = req.body;

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
          },
        });

        return res.status(200).json(user);
      } catch (error) {
        console.error(`[api] /api/user`, getErrorMessage(error));
        return res
          .status(500)
          .json({ statusCode: 500, message: getErrorMessage(error) });
      }

    case 'POST':
      try {
        const updateUser = await prisma.user.update({
          where: {
            id: userID,
          },
          data: {
            foodNeeds: foodNeeds,
            student: student,
            publicProfile: publicProfile,
          },
        });
        return res.status(200).json({
          statusCode: 200,
          message: 'updated',
        });
      } catch (e) {
        console.error(e);
      }
  }
};

export default handler;
