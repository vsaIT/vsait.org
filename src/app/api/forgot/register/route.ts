import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import {
  RESET_TOKEN_TTL_MS,
  generateResetToken,
  hashResetToken,
} from '@/lib/auth/resetTokens';
import { isEmpty } from 'lodash';
import { sendEmail } from './utils';
import { NextRequest, NextResponse } from 'next/server';

const POST = async (req: NextRequest) => {
  const body = await req.json();
  const email: string = isEmpty(body.email) ? '' : String(body.email);
  try {
    const user = email
      ? await prisma.user.findFirst({
          where: {
            email: email,
          },
          select: {
            id: true,
            email: true,
            firstName: true,
          },
        })
      : null;

    if (user) {
      // A fresh token on every request, so asking again cancels the link sent before it
      const token = generateResetToken();
      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetUrl: hashResetToken(token),
          passwordResetExpires: new Date(Date.now() + RESET_TOKEN_TTL_MS),
        },
      });

      await sendEmail(user.firstName, user.email, token)
        .then(({ data }) => {
          if (data.error) throw new Error('Sending failed!');
        })
        .catch(() => {
          throw new Error('Sending failed!');
        });
    }
    return NextResponse.json(
      {
        message:
          'An e-mail with the instructions to reset the password will be sent if a user is registered with given email.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[api] /api/forgot/register', getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

const GET = async () => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { POST, GET };
