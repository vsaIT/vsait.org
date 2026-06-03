import { getErrorMessage } from '@/lib/utils';
import { isEmpty } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';

// This route serves the archive of past events, most recent first, paginated.
export const dynamic = 'force-dynamic';

const TAKE = 7;

// Returns a page of the past-events archive (most recent first).
const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = isEmpty(searchParams.get('page'))
      ? 1
      : Number(searchParams.get('page'));

    const total = await prisma.eventArchive.count();
    const pages = Math.max(1, Math.ceil(total / TAKE));
    const currentPage = Math.min(Math.max(page, 1), pages);

    const events = await prisma.eventArchive.findMany({
      orderBy: { startTime: 'desc' },
      skip: (currentPage - 1) * TAKE,
      take: TAKE,
    });

    return NextResponse.json(
      { events, page: currentPage, pages },
      { status: 200 }
    );
  } catch (error) {
    console.error('[api] /api/events/archive', getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { GET };
