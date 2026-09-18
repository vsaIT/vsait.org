import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import { isEmpty } from 'lodash';
import { getToken } from 'next-auth/jwt';
import { requireAdmin } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { put } from '@vercel/blob';
import {
  EventTimes,
  checkEventTimes,
  parseEventBody,
  validationMessage,
} from './validateEvent';

const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = isEmpty(searchParams.get('page'))
    ? 0
    : Number(searchParams.get('page'));
  const upcoming = isEmpty(searchParams.get('upcoming')) ? false : true;
  const all = isEmpty(searchParams.get('all')) ? false : true;
  const token = await getToken({ req });
  const isAdmin = token?.role == 'ADMIN';

  // Retrieve all events, admins only
  try {
    if (all) {
      if (!isAdmin) {
        return NextResponse.json(
          {
            message: 'Forbidden: Admins only',
          },
          { status: 403 }
        );
      }
      const events = await prisma.event.findMany({
        orderBy: {
          startTime: 'desc',
        },
        include: {
          registrationList: true,
          waitingList: true,
          attendanceList: true,
        },
      });
      return NextResponse.json(
        {
          events: events,
          page: 1,
          pages: 1,
        },
        { status: 200 }
      );
    } else {
      const take = 5;
      const events = await prisma.event.findMany({
        where: upcoming
          ? {
              isDraft: false,
              startTime: {
                gte: new Date(),
              },
            }
          : {
              isDraft: false,
            },
        orderBy: {
          startTime: 'desc',
        },
        include: {
          registrationList: isAdmin,
          attendanceList: isAdmin,
          waitingList: isAdmin,
          _count: {
            select: {
              registrationList: true,
              waitingList: true,
            },
          },
        },
      });

      const pages = Math.ceil(events.length / take);
      const currentPage = Math.min(page || 1, pages);

      return NextResponse.json(
        {
          events: events.slice((currentPage - 1) * take, currentPage * take),
          page: currentPage,
          pages: pages,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('[api] /api/events', getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

const POST = async (req: NextRequest) => {
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

  try {
    const body = await req.json();

    // Everything is checked before anything is uploaded
    const { fields, image, errors } = parseEventBody(body, { isCreate: true });
    if (!errors.length) {
      errors.push(...checkEventTimes(fields as EventTimes));
    }
    if (errors.length) {
      return NextResponse.json(
        { message: validationMessage(errors), errors },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;
    if (image.kind === 'upload') {
      const { url } = await put(`images/${uuidv4()}`, image.blob, {
        access: 'public',
      });
      imageUrl = url;
    }

    const event = await prisma.event.create({
      data: {
        title: fields.title as string,
        description: fields.description ?? '',
        location: fields.location as string,
        startTime: fields.startTime as Date,
        endTime: fields.endTime as Date,
        registrationDeadline: fields.registrationDeadline as Date,
        cancellationDeadline: fields.cancellationDeadline as Date,
        eventType: fields.eventType,
        maxRegistrations: fields.maxRegistrations,
        isDraft: fields.isDraft,
        isCancelled: fields.isCancelled,
        image: imageUrl,
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('[api] /api/events [POST]', getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { GET, POST };
