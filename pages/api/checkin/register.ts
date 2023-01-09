import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@db';
import { getSession } from '@lib/auth/session';
import { getErrorMessage } from '@lib/utils';
import { isEmpty } from 'lodash';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Only POST requests allowed' });

  const email: string = isEmpty(req.body?.email) ? '' : req.body.email;
  const userid: string = isEmpty(req.body?.userid) ? '' : req.body.userid;
  const eventId = isEmpty(req?.body?.eventId) ? 0 : Number(req?.body?.eventId);

  const session = await getSession({ req });
  if (!session || session?.user?.role !== 'ADMIN')
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
    });

  try {
    // Retrieve user with email
    let id = userid;
    if (email !== '') {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
        select: {
          id: true,
        },
      });
      if (!user) throw new Error(`Could not find user with email ${email}`);
      id = user.id;
    }

    // Retrieve event with registrationList
    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
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
    if (!event) throw new Error(`Could not find event with id ${eventId}`);
    const registeredUserIds = event.registrationList.map((r) => r.userId) || [];
    const attendingUserIds = event.attendanceList.map((r) => r.userId) || [];

    // Register user attendance if user is registered
    if (registeredUserIds.includes(id)) {
      // Throw if user is already registered
      if (attendingUserIds.includes(id))
        throw new Error('User has already registered their attendance');

      await prisma.attendances.upsert({
        where: {
          userId_eventId: {
            eventId: Number(eventId),
            userId: id,
          },
        },
        update: {},
        create: {
          eventId: Number(eventId),
          userId: id,
        },
      });
    } else throw new Error('User is not registered to the event');

    return res.status(200).json({
      statusCode: 200,
      message: `Successfully registered attendance for user with email ${email}`,
    });
  } catch (error) {
    console.error('[api] /api/checkin/register', getErrorMessage(error));
    return res
      .status(200)
      .json({ statusCode: 500, message: getErrorMessage(error) });
  }
};

export default handler;
