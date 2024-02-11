import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';

const GET = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  const userID = params.userid;
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
      include: {
        membership: true,
        userAttendanceList: true,
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

const POST = async () => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { GET, POST };
