import { exclude, getErrorMessage } from '@/lib/utils';
import { UserType } from '@/types';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import prisma, { User } from 'prisma/index';
import { updateUserMemberships } from './utils';
import { requireAdmin, requireSelfOrAdmin } from '../../utils';

const GET = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  const userID = params.userid;
  const authResponse = await requireSelfOrAdmin(req, userID);
  if (authResponse) return authResponse;

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
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

  try {
    const data: UserType = await req.json();
    const filteredData = exclude(data, [
      'membership',
      'userAttendanceList',
    ]) as User;
    const updatedUser = exclude(
      await prisma.user.update({
        where: {
          id: userID,
        },
        data: filteredData,
      }),
      ['password']
    );
    await updateUserMemberships(userID, data.membership);
    return NextResponse.json({ user: updatedUser }, { status: 200 });
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

const DELETE = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  const userID = params.userid;
  const authResponse = await requireSelfOrAdmin(req, userID);
  if (authResponse) return authResponse;

  try {
    const userToDelete = await prisma.user.findUnique({
      where: { id: userID },
      select: { role: true },
    });
    if (!userToDelete) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (userToDelete.role === 'ADMIN') {
      return NextResponse.json(
        { message: 'Cannot delete admins' },
        { status: 403 }
      );
    }

    await prisma.user.delete({
      where: {
        id: userID,
      },
    });
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

export { DELETE, GET, POST, PUT };
