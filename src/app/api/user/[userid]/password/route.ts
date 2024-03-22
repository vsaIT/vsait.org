import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import { hashPassword, verifyPassword } from '@/lib/auth/passwords';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

type BodyType = {
  oldPassword: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;
};

const POST = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  const body: BodyType = await req.json();
  const userID = params.userid;
  const oldPassword = body.oldPassword || '';
  const newPassword = body.newPassword || '';
  const confirmPassword = body.confirmPassword || '';
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }
  if (userID !== token.id && token.role !== 'ADMIN') {
    return NextResponse.json(
      {
        message: 'Cannot change password for another user',
      },
      { status: 401 }
    );
  }

  try {
    if (newPassword.length < 8 || confirmPassword.length < 8)
      throw new Error('Passord må være minst 8 tegn langt');
    if (newPassword !== confirmPassword)
      throw new Error('Passordene er ikke like!');

    // Only fetch and verify the old password if the user is not an admin
    if (token.role !== 'ADMIN') {
      if (oldPassword.length < 8)
        throw new Error('Passord må være minst 8 tegn langt');
      const user = await prisma.user.findFirst({
        where: {
          id: userID,
        },
        select: {
          password: true,
        },
      });
      const hashedPassword = user?.password || '';
      if (!verifyPassword(oldPassword, hashedPassword))
        throw new Error('Gammelt passord samsvarer ikke!');
    }

    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        password: hashPassword(newPassword, 12),
      },
    });

    return NextResponse.json(
      {
        message: 'Passord oppdatert!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
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

export { GET, POST };
