import prisma from 'prisma/index';
import { getErrorMessage, getMembershipYear } from '@/lib/utils';
import { RegisteredUserType } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Event } from '@prisma/client';
import { requireAdmin } from '../../utils';
import { del, put } from "@vercel/blob"
import { v4 as uuidv4 } from 'uuid';
import { base64ToBlob, isValidImageUrl } from '@/lib/imageBlobUtil';

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
      },
    });
    if (!event) {
      return NextResponse.json(
        { message: `Could not find event with id ${eventid}` },
        { status: 404 }
      );
    }

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
          name: `${user.firstName} ${user.lastName}`,
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

const PUT = async (
  req: NextRequest,
  { params }: { params: { eventid: number } }
) => {
  const eventid = params.eventid;
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

  try {
    const body = (await req.json()) as any;

    const currentEvent = await prisma.event.findFirst({
      where: {
        id: Number(eventid)
      }
    })

    const imageUrl = currentEvent?.image as string;

    // If image is a base64 data URL string, convert it to a Blob first.
    if (typeof body.image === 'string') {
      try {
        const maybeBlob = base64ToBlob(body.image);
        if (maybeBlob instanceof Blob) {
          body.image = maybeBlob;
        }
      } catch (e) {
        // ignore conversion errors and leave body.image as-is
      }
    }

    // If image is a Blob, upload it and replace with the returned URL string.
    if (body.image && body.image instanceof Blob) {
      if (isValidImageUrl(imageUrl)) {
        await del(imageUrl);
      }

      const filename = uuidv4();
      const { url } = await put(`images/${filename}`, body.image, {
        access: "public",
      });
      body.image = url;
    }

    const updatedEvent = await prisma.event.update({
      where: { id: Number(eventid) },
      data: body,
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
        id: Number(eventid)
      }
    })

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

export { GET, POST, PUT, DELETE };
