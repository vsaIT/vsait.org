import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getErrorMessage } from '@lib/utils';
import { getSession } from '@lib/auth/session';
import { hashPassword, verifyPassword } from '@lib/auth/passwords';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const userID = query.userid as string;
  const { oldPassword, newPassword, confirmPassword } = req.body;
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
        if (
          newPassword.length < 8 ||
          oldPassword.length < 8 ||
          confirmPassword.length < 8
        )
          throw new Error(
            'Password length has to be at least 8 characters long'
          );
        // Verify password is the same
        if (newPassword !== confirmPassword)
          throw new Error('Password does not match!');
        // Verify old password is correct
        const user = await prisma.user.findFirst({
          where: {
            id: userID,
          },
          select: {
            password: true,
          },
        });
        // Get the salt from user password and iterations taken
        // Hash the oldPassword with the salt and iteration count

        const hashedPassword = user?.password || '';
        if (!verifyPassword(oldPassword, hashedPassword))
          throw new Error('Old password is not correct!');
        // Update databases with new password
        await prisma.user.update({
          where: {
            id: userID,
          },
          data: {
            password: hashPassword(newPassword, 12),
          },
        });
        return res.status(200).json({
          statusCode: 200,
          message: 'updated',
        });
      } catch (error) {
        console.error(error);
        return res
          .status(200)
          .json({ statusCode: 500, message: getErrorMessage(error) });
      }
    default:
      return res
        .status(400)
        .json({ statusCode: 400, message: 'Method is not supported' });
  }
};

export default handler;
