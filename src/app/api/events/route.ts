import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import { isEmpty } from 'lodash';
import { getToken } from 'next-auth/jwt';

const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = isEmpty(searchParams.get('page'))
    ? 0
    : Number(searchParams.get('page'));
  const upcoming = isEmpty(searchParams.get('upcoming')) ? false : true;
  const all = isEmpty(searchParams.get('all')) ? false : true;
  const token = await getToken({ req });

  // Retrieve all events, admins only
  try {
    if (all) {
      if (token?.role !== 'ADMIN') {
        return NextResponse.json(
          {
            message: 'Unauthorized',
          },
          { status: 401 }
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
          registrationList: true,
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

const POST = async () => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { GET, POST };
