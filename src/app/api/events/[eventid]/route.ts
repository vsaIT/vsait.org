import prisma from 'prisma/index';
import { getErrorMessage, getMembershipYear } from '@/lib/utils';
import { RegisteredUserType } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const handler = async (
  req: NextRequest,
  { params }: { params: { eventid: number } }
) => {
  const eventid = params.eventid;
  const token = await getToken({ req: req });

  try {
    // Retrieve events including registrationList, waitingList and attendanceList
    const event = await prisma.event.findFirst({
      where:
        token?.role === 'ADMIN'
          ? {
              id: Number(eventid),
            }
          : {
              id: Number(eventid),
              isDraft: false,
            },
      include: {
        registrationList: {
          select: {
            userId: true,
            user: {
              select: {
                id: true,
                lastName: true,
                firstName: true,
                email: true,
                foodNeeds: true,
                membership: true,
              },
            },
          },
        },
        waitingList: true,
        attendanceList: token?.role === 'ADMIN',
      },
    });
    if (!event) throw new Error(`Could not find event with id ${eventid}`);

    // Set user ids in registrationList as filtering for registered users
    let registeredUsers: RegisteredUserType[] = [];
    const userIds = event.registrationList.map((r) => r.userId) || [];
    const userId = token?.id || '';

    if (token) {
      // Map registered users with fields name, email and foodNeeds
      registeredUsers = event?.registrationList.map(({ user }) => {
        if (!user) return { name: '', email: '', foodNeeds: '' };
        if (token?.role === 'ADMIN' || token?.email === user.email) {
          return {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            foodNeeds: user.foodNeeds,
          };
        }
        return {
          name:`${user.firstName} ${user.lastName}`,
          email: '',
          foodNeeds: '',
        };
      });
    }
    const hasMembership =
      event?.registrationList.filter(
        ({ user }) =>
          user?.id === userId &&
          user?.membership.map((m) => m.year).includes(getMembershipYear())
      ).length > 0;

    return NextResponse.json(
      {
        event: event,
        registrations: registeredUsers,
        hasRegistered:
          userIds.includes(userId) ||
          event.waitingList.map((r) => r.userId).includes(userId),
        hasMembership: hasMembership,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`[api] /api/events/${eventid}`, getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { handler as GET, handler as POST };
