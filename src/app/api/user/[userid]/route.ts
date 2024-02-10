import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma';
import { getErrorMessage } from 'src/lib/utils';

const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const userID = searchParams.get('userid') as string;
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
        message: 'Cannot register event for another user',
      },
      { status: 401 }
    );

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userID,
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
        membership: true,
        profileIconSeed: true,
        userAttendanceList: {
          select: {
            event: true,
          },
        },
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(`[api] /api/user`, getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

const POST = async (req: NextRequest) => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { GET, POST };