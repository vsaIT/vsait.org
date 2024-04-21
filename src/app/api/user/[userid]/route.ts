import { exclude, getErrorMessage } from '@/lib/utils';
import { AttendancesType, UserType } from '@/types';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import prisma, { Attendances, Membership, User } from 'prisma/index';
import { updateUserMemberships } from './utils';

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
    const user = exclude(
      await prisma.user.findFirst({
        where: {
          id: userID,
        },
        include: {
          membership: true,
          userAttendanceList: true,
        },
      }),
      ['password']
    );
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(`[api] /api/user`, getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

const PUT = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  const userID = params.userid;
  const token = await getToken({ req });

  if (!token || token.role !== 'ADMIN')
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      { status: 401 }
    );

  try {
    const data: UserType = await req.json();
    const filteredData = exclude(data, [
      'membership',
      'userAttendanceList',
    ]) as User;
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: filteredData,
    });
    await updateUserMemberships(userID, data.membership);
    return GET(req, { params });
  } catch (error) {
    console.error(`[api] /api/user`, getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

const POST = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token)
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      { status: 401 }
    );

  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

const DELETE = async (
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
    await prisma.user.delete({
      where: {
        id: userID,
      },
    });
    // await prisma.attendances.deleteMany({
    //   where: {
    //     userId: userID,
    //   },
    // });
    await prisma.registrations.deleteMany({
      where: {
        userId: userID,
      },
    });
    await prisma.waiting.deleteMany({
      where: {
        userId: userID,
      },
    });

    return NextResponse.json('User deleted', { status: 200 });
  } catch (error) {
    console.error(`[api] /api/user`, getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { GET, POST, PUT, DELETE };
