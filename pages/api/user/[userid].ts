import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getErrorMessage } from '@lib/utils';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userid } = req.query;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userid as string,
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
};

export default handler;
