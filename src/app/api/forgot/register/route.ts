import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import {
  RESET_TOKEN_TTL_MS,
  generateResetToken,
  hashResetToken,
} from '@/lib/auth/resetTokens';
import { TOO_MANY_REQUESTS, clientIp, isRateLimited } from '@/lib/rateLimit';
import { isEmpty } from 'lodash';
import { sendEmail } from './utils';
import { NextRequest, NextResponse } from 'next/server';

const FORGOT_LIMIT = 10;
const FORGOT_WINDOW_MS = 15 * 60 * 1000;
const FORGOT_COOLDOWN_MS = 60 * 1000;

// A link was sent within the cooldown if its expiry is still almost a full TTL away
const sentRecently = (expires: Date | null) =>
  !!expires &&
  expires.getTime() - Date.now() > RESET_TOKEN_TTL_MS - FORGOT_COOLDOWN_MS;

const POST = async (req: NextRequest) => {
  const ip = clientIp(req.headers.get('x-forwarded-for'));
  if (isRateLimited(`forgot:${ip}`, FORGOT_LIMIT, FORGOT_WINDOW_MS)) {
    return NextResponse.json({ message: TOO_MANY_REQUESTS }, { status: 429 });
  }

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
            passwordResetExpires: true,
          },
        })
      : null;

    // Skipped silently on cooldown
    if (user && !sentRecently(user.passwordResetExpires)) {
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
