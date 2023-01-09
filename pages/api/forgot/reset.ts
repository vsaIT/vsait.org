import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getErrorMessage } from '@lib/utils';
import { isEmpty } from 'lodash';
import { generateSalt, hashPassword } from '@lib/auth/passwords';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const resetId = isEmpty(req.body?.resetId) ? '' : String(req.body.resetId);
  const password = isEmpty(req.body?.password) ? '' : String(req.body.password);
  const repeatPassword = isEmpty(req.body?.repeatPassword)
    ? ''
    : String(req.body.repeatPassword);

  if (password !== repeatPassword) throw new Error('Passwords do not match!');
  if (password.length < 8)
    throw new Error('Password must include more than 8 characters');

  try {
    const userWithResetId = await prisma.user.findFirst({
      where: {
        passwordResetUrl: resetId,
      },
      select: {
        id: true,
      },
    });
    if (!userWithResetId) throw new Error('No user with given resetId found');

    const user = await prisma.user.update({
      where: {
        id: userWithResetId.id,
      },
      data: {
        password: hashPassword(password, 12),
        passwordResetUrl: generateSalt(12),
      },
      select: {
        id: true,
      },
    });
    return res.status(200).json({ statusCode: 200, user });
  } catch (error) {
    console.error('[api] /api/forgot/reset', getErrorMessage(error));
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
};

export default handler;
