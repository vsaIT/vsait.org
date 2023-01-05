import { NextApiRequest, NextApiResponse } from 'next';
import prisma, { Registrations, User } from '@db';
import { getSession } from '@lib/auth/session';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getSession({ req });

  try {
    // Retrieve events including registrationList, waitingList and attendanceList
    const event = await prisma.event.findFirst({
      where: {
        id: Number(id),
        isDraft: false,
      },
      include: {
        registrationList: {
          select: {
            userId: true,
          },
        },
        waitingList: true,
        attendanceList: session?.user?.role === 'admin',
      },
    });
    // Set user ids in registrationList as filtering for registered users
    let registeredUsers: any[] = [];
    const userIds = event?.registrationList.map((r) => r.userId) || [];

    // Retrieve registered users if logged in
    if (session) {
      registeredUsers = await prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
        select: {
          lastName: true,
          firstName: true,
          email: true,
          foodNeeds: true,
        },
      });

      // Map registered users with fields name, email and foodNeeds
      registeredUsers = registeredUsers.map((user) => {
        if (session?.user?.role === 'USER') {
          return { name: 'Anonymous', email: '', foodNeeds: '' };
        }
        return {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          foodNeeds: user.foodNeeds,
        };
      });
    }

    return res.status(200).json({
      event: event,
      registrations: registeredUsers,
      registered: userIds.includes(session?.user?.id || ''),
    });
  } catch (error: any) {
    console.error(`[api] /api/events/${id}`, error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default handler;
