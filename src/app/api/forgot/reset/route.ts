import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import { isEmpty } from 'lodash';
import { generateSalt, hashPassword } from '@/lib/auth/passwords';
import { NextRequest, NextResponse } from 'next/server';

const handler = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const resetId: string = isEmpty(body.resetId) ? '' : String(body.resetId);
    const password: string = isEmpty(body.password)
      ? ''
      : String(body.password);
    const repeatPassword: string = isEmpty(body.repeatPassword)
      ? ''
      : String(body.repeatPassword);

    if (password !== repeatPassword) throw new Error('Passwords do not match!');
    if (password.length < 8)
      throw new Error('Minimum password length is set at 8 characters');

    const userWithResetId = await prisma.user.findFirst({
      where: { passwordResetUrl: resetId },
      select: { id: true },
    });
    if (!userWithResetId) throw new Error('No user with given resetId found');

    const user = await prisma.user.update({
      where: { id: userWithResetId.id },
      data: {
        password: hashPassword(password, 12),
        passwordResetUrl: generateSalt(12),
      },
      select: { id: true },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('[api] /api/forgot/reset', getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { handler as POST, handler as GET };
