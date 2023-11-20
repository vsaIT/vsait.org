import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma';
import { getSession } from '@lib/auth/session';
import { getErrorMessage, getMembershipYear } from '@lib/utils';
import { RegisteredUserType } from '@lib/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventid } = req.query;
  const session = await getSession({ req });

  try {
    // Retrieve events including registrationList, waitingList and attendanceList
    const event = await prisma.event.findFirst({
      where:
        session?.user?.role === 'ADMIN'
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
                publicProfile: true,
                membership: true,
              },
            },
          },
        },
        waitingList: true,
        attendanceList: session?.user?.role === 'admin',
      },
    });
    if (!event) throw new Error(`Could not find event with id ${eventid}`);

    // Set user ids in registrationList as filtering for registered users
    let registeredUsers: RegisteredUserType[] = [];
    const userIds = event.registrationList.map((r) => r.userId) || [];
    const userId = session?.user?.id || '';

    if (session) {
      // Map registered users with fields name, email and foodNeeds
      registeredUsers = event?.registrationList.map(({ user }) => {
        if (!user) return { name: '', email: '', foodNeeds: '' };
        if (
          session?.user?.role === 'ADMIN' ||
          session?.user?.email === user.email
        ) {
          return {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            foodNeeds: user.foodNeeds,
          };
        }
        return {
          name: user.publicProfile
            ? `${user.firstName} ${user.lastName}`
            : 'Anonymous',
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

    return res.status(200).json({
      event: event,
      registrations: registeredUsers,
      hasRegistered:
        userIds.includes(userId) ||
        event.waitingList.map((r) => r.userId).includes(userId),
      hasMembership: hasMembership,
    });
  } catch (error) {
    console.error(`[api] /api/events/${eventid}`, getErrorMessage(error));
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
};

export default handler;
