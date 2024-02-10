import prisma from 'prisma';
import { getErrorMessage } from 'src/lib/utils';
import { isEmpty } from 'lodash';
import { sendEmail } from './utils';
import { NextRequest, NextResponse } from 'next/server';

const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const email: string = isEmpty(searchParams.get('email'))
    ? ''
    : String(searchParams.get('email'));
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
        firstName: true,
        passwordResetUrl: true,
      },
    });

    if (user) {
      await sendEmail(user.firstName, user.email, user.passwordResetUrl)
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

const GET = async (req: NextRequest) => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { POST, GET };
