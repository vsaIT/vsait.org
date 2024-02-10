import prisma from 'prisma';
import { getErrorMessage } from 'src/lib/utils';
import { AttendingUserType } from 'src/lib/types';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const handler = async (req: NextRequest, {params}: {params: {eventid: number}}) => {
  const eventid = params.eventid;
  const token = await getToken({ req: req });

  if (!token || token.role !== 'ADMIN')
    return NextResponse.json({
      message: 'Unauthorized',
    }, { status: 401 });

  try {
    const event = await prisma.event.findFirst({
      where: {
        id: Number(eventid),
      },
      include: {
        registrationList: {
          select: {
            userId: true,
          },
        },
        attendanceList: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (!event) throw new Error(`Could not find event with id ${eventid}`);

    const registeredUserIds = event.registrationList.map((r) => r.userId) || [];
    const attendingUserIds = event.attendanceList.map((r) => r.userId) || [];

    // Retrieve registered users
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: registeredUserIds,
        },
      },
      select: {
        id: true,
        lastName: true,
        firstName: true,
        email: true,
        foodNeeds: true,
        membership: true,
      },
    });

    // Map registered users with fields name, email and foodNeeds
    const attendingUsers: AttendingUserType[] = users.map((user) => {
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        foodNeeds: user.foodNeeds,
        checked: attendingUserIds.includes(user.id),
      };
    });

    return NextResponse.json({
      event: event,
      attendances: attendingUsers,
    }, { status: 200 });
  } catch (error) {
    console.error(`[api] /api/checkin/${eventid}`, getErrorMessage(error));
    return NextResponse.json({ statusCode: 500, message: getErrorMessage(error) }, { status: 500 });
  }
};

export { handler as GET, handler as POST }
