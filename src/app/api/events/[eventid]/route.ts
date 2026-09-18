import { isValidImageUrl } from '@/lib/imageBlobUtil';
import { getErrorMessage, getMembershipYear } from '@/lib/utils';
import { RegisteredUserType } from '@/types/types';
import { Prisma } from '@prisma/client';
import { del, put } from '@vercel/blob';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { v4 as uuidv4 } from 'uuid';
import { requireAdmin } from '../../utils';
import {
  checkEventTimes,
  parseEventBody,
  validationMessage,
} from '../validateEvent';

const POST = async () => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

const GET = async (
  req: NextRequest,
  { params }: { params: { eventid: number } }
) => {
  const eventid = params.eventid;
  const token = await getToken({ req: req });
  const isAdmin = token?.role === 'ADMIN';

  try {
    // Retrieve events including registrationList, waitingList and attendanceList
    const event = await prisma.event.findFirst({
      where: isAdmin
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
        attendanceList: isAdmin,
        _count: {
          select: {
            registrationList: true,
            waitingList: true,
          },
        },
      },
    });
    if (!event) {
      return NextResponse.json(
        { message: `Could not find event with id ${eventid}` },
        { status: 404 }
      );
    }

    // Who is coming is between them and the admin
    let registeredUsers: RegisteredUserType[] = [];
    const userIds = event.registrationList.map((r) => r.userId) || [];
    const userId = token?.id || '';

    if (isAdmin) {
      registeredUsers = event.registrationList.map(({ user }) => {
        if (!user) return { name: '', email: '', foodNeeds: '' };
        return {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          foodNeeds: user.foodNeeds,
        };
      });
    }
    // Check the logged-in user's own membership directly
    let hasMembership = false;
    if (userId) {
      const currentUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { membership: { select: { year: true } } },
      });
      hasMembership =
        currentUser?.membership.some((m) => m.year === getMembershipYear()) ??
        false;
    }

    const hasRegistered =
      userIds.includes(userId) ||
      event.waitingList.map((r) => r.userId).includes(userId);

    // The relations carry the registrants' details
    const {
      registrationList: _registrationList,
      waitingList: _waitingList,
      ...publicEvent
    } = event;

    return NextResponse.json(
      {
        event: isAdmin
          ? event
          : { ...publicEvent, registrationList: [], waitingList: [] },
        registrations: registeredUsers,
        hasRegistered: hasRegistered,
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

const PUT = async (
  req: NextRequest,
  { params }: { params: { eventid: number } }
) => {
  const eventid = params.eventid;
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

  try {
    const body = await req.json();

    const currentEvent = await prisma.event.findFirst({
      where: {
        id: Number(eventid),
      },
    });
    if (!currentEvent) {
      return NextResponse.json(
        { message: `Could not find event with id ${eventid}` },
        { status: 404 }
      );
    }

    // The same checks as creating
    const { fields, image, errors } = parseEventBody(body, { isCreate: false });
    if (!errors.length) {
      errors.push(
        ...checkEventTimes({
          startTime: fields.startTime ?? currentEvent.startTime,
          endTime: fields.endTime ?? currentEvent.endTime,
          registrationDeadline:
            fields.registrationDeadline ?? currentEvent.registrationDeadline,
          cancellationDeadline:
            fields.cancellationDeadline ?? currentEvent.cancellationDeadline,
        })
      );
    }
    if (errors.length) {
      return NextResponse.json(
        { message: validationMessage(errors), errors },
        { status: 400 }
      );
    }

    const data: Prisma.EventUpdateInput = { ...fields };

    if (image.kind === 'upload') {
      // Drop the blob it replaces, so removed pictures do not linger
      if (isValidImageUrl(currentEvent.image)) {
        await del(currentEvent.image as string);
      }
      const { url } = await put(`images/${uuidv4()}`, image.blob, {
        access: 'public',
      });
      data.image = url;
    } else if (image.kind === 'clear') {
      data.image = null;
    }

    const updatedEvent = await prisma.event.update({
      where: { id: Number(eventid) },
      data,
    });
    return NextResponse.json({ event: updatedEvent }, { status: 200 });
  } catch (error) {
    console.error(`[api] /api/events/${eventid} [PUT]`, getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

const DELETE = async (
  req: NextRequest,
  { params }: { params: { eventid: number } }
) => {
  const eventid = params.eventid;
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

  try {
    const currentEvent = await prisma.event.findFirst({
      where: {
        id: Number(eventid),
      },
    });

    const imageUrl = currentEvent?.image as string;

    if (isValidImageUrl(imageUrl)) {
      await del(imageUrl);
    }

    await prisma.event.delete({ where: { id: Number(eventid) } });
    return NextResponse.json({ message: 'Event deleted' }, { status: 200 });
  } catch (error) {
    console.error(
      `[api] /api/events/${eventid} [DELETE]`,
      getErrorMessage(error)
    );
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { DELETE, GET, POST, PUT };
