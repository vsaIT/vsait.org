import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import { isEmpty } from 'lodash';
import { getToken } from 'next-auth/jwt';
import { requireAdmin } from '../utils';
import { Event } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { put } from '@vercel/blob';
import { base64ToBlob } from '@/lib/imageBlobUtil';

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

    // Handle image upload if present
    if (typeof body.image === 'string' && body.image.startsWith('data:image')) {
      try {
        const maybeBlob = base64ToBlob(body.image);
        if (maybeBlob instanceof Blob) {
          const filename = uuidv4();
          const { url } = await put(`images/${filename}`, maybeBlob, {
            access: 'public',
          });
          body.image = url;
        }
      } catch (e) {
        // ignore conversion errors
        console.error('Image upload failed', e);
      }
    }

    const event = await prisma.event.create({
      data: body,
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
