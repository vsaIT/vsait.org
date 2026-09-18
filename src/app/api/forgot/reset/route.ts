import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import { isEmpty } from 'lodash';
import { hashPassword } from '@/lib/auth/passwords';
import {
  activeResetTokenWhere,
  generateResetToken,
  hashResetToken,
} from '@/lib/auth/resetTokens';
import { NextRequest, NextResponse } from 'next/server';

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const resetId: string = isEmpty(body.resetId) ? '' : String(body.resetId);
    const password: string = isEmpty(body.password)
      ? ''
      : String(body.password);
    const repeatPassword: string = isEmpty(body.repeatPassword)
      ? ''
      : String(body.repeatPassword);

    // Checked before any lookup, so a missing token can never be matched against whatever happens to be stored
    if (!resetId) throw new Error('No user with given resetId found');
    if (password !== repeatPassword) throw new Error('Passwords do not match!');
    if (password.length < 8)
      throw new Error('Minimum password length is set at 8 characters');

    const userWithResetId = await prisma.user.findFirst({
      where: activeResetTokenWhere(resetId),
      select: { id: true },
    });
    if (!userWithResetId) throw new Error('No user with given resetId found');

    // Single use
    const user = await prisma.user.update({
      where: { id: userWithResetId.id },
      data: {
        password: hashPassword(password, 12),
        passwordResetUrl: hashResetToken(generateResetToken()),
        passwordResetExpires: null,
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

export { POST };
