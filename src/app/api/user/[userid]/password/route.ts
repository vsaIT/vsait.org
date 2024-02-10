import prisma from 'prisma';
import { getErrorMessage } from 'src/lib/utils';
import { hashPassword, verifyPassword } from 'src/lib/auth/passwords';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const body = await req.json();

  const userID = searchParams.get('userid') as string;
  const { oldPassword, newPassword, confirmPassword } = body;
  const token = await getToken({ req });

  if (!token)
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  if (userID !== token?.id && token?.role !== 'ADMIN')
    return NextResponse.json(
      {
        message: 'Cannot change password for another user',
      },
      { status: 401 }
    );

  try {
    if (
      newPassword.length < 8 ||
      oldPassword.length < 8 ||
      confirmPassword.length < 8
    )
      throw new Error('Password length has to be at least 8 characters long');
    if (newPassword !== confirmPassword)
      throw new Error('Password does not match!');
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
      throw new Error('Old password is not correct!');
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
        message: 'updated',
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

const GET = async (req: NextRequest) => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { GET, POST };
