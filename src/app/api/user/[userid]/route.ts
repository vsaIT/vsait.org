import { exclude, getErrorMessage } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { requireAdmin, requireSelfOrAdmin } from '../../utils';
import { updateUserMemberships } from './utils';

const GET = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  const userID = params.userid;
  const authResponse = await requireSelfOrAdmin(req, userID);
  if (authResponse) return authResponse;

  // Only the event fields the profile actually renders
  const eventSummary = {
    select: {
      id: true,
      title: true,
      startTime: true,
      endTime: true,
    },
  };

  try {
    const user = exclude(
      await prisma.user.findFirst({
        where: {
          id: userID,
        },
        include: {
          membership: true,
          userAttendanceList: {
            // Without the relation the client only gets userId/eventId/createdAt
            include: { event: eventSummary },
          },
          userRegistrationList: {
            where: { event: { endTime: { lt: new Date() } } },
            include: { event: eventSummary },
            orderBy: { event: { startTime: 'desc' } },
          },
        },
      }),
      ['password']
    );
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(`[api] /api/user`, getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

// Updates a user from the admin page.
const PUT = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  const userID = params.userid;
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

  try {
    const body = await req.json();
    const data: Prisma.UserUpdateInput = {};

    for (const field of ['firstName', 'lastName', 'email'] as const) {
      if (typeof body[field] === 'string' && body[field].trim()) {
        data[field] = body[field].trim();
      }
    }
    if (typeof body.foodNeeds === 'string') {
      data.foodNeeds = body.foodNeeds;
    }
    if (typeof body.student === 'string') {
      data.student = body.student;
    }
    for (const field of ['emailVerified', 'pendingMembership'] as const) {
      if (typeof body[field] === 'boolean') data[field] = body[field];
    }
    if (body.role === 'USER' || body.role === 'ADMIN') {
      data.role = body.role;
    }

    const updatedUser = exclude(
      await prisma.user.update({
        where: {
          id: userID,
        },
        data,
      }),
      ['password']
    );

    // Memberships are a relation of their own, set through the join table
    if (Array.isArray(body.membership)) {
      const membershipYears = body.membership
        .map((membership: { year?: unknown }) => Number(membership?.year))
        .filter((year: number) => Number.isInteger(year))
        .map((year: number) => ({ year }));
      await updateUserMemberships(userID, membershipYears);
    }
    return NextResponse.json({ user: updatedUser }, { status: 200 });
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
