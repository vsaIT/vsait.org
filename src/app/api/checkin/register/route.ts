import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma';
import { getSession } from 'src/lib/auth/session';
import { getErrorMessage } from 'src/lib/utils';
import { isEmpty } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const POST = async (req: NextRequest) => {
  const body = await req.json();
  const email: string = isEmpty(body.email) ? '' : body.email;
  const userid: string = isEmpty(body.userid) ? '' : body.userid;
  const eventId = isEmpty(body.eventId) ? 0 : Number(body.eventId);

  const token = await getToken({ req: req })
  if (!token || token.role !== 'ADMIN')
    return NextResponse.json({message:'Unauthorized'}, { status: 401 });
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

    return NextResponse.json({message:`Successfully registered attendance for user with email ${email}`}, { status: 201 });
  } catch (error) {
    console.error('[api] /api/checkin/register', getErrorMessage(error));
    return NextResponse.json({message:getErrorMessage(error)}, { status: 500 });
  }
};

const GET = async (req: NextRequest) => {
  return NextResponse.json({message:'Only POST requests are allowed'}, { status: 404 });
};

export { POST, GET };
