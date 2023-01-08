import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getSession } from '@lib/auth/session';
import { getErrorMessage } from '@lib/utils';
import { AttendingUserType } from '@lib/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventid } = req.query;
  const session = await getSession({ req });
  if (!session || session?.user?.role !== 'ADMIN')
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
    });

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

    return res.status(200).json({
      event: event,
      attendances: attendingUsers,
    });
  } catch (error) {
    console.error(`[api] /api/checkin/${eventid}`, getErrorMessage(error));
    return res
      .status(500)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
};

export default handler;
