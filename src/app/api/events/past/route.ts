import { getErrorMessage } from '@/lib/utils';
import { isEmpty } from 'lodash';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';

export const dynamic = 'force-dynamic';
const TAKE = 6;

const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = isEmpty(searchParams.get('page'))
      ? 1
      : Number(searchParams.get('page'));

    const [archived, finished] = await Promise.all([
      prisma.eventArchive.findMany({ orderBy: { startTime: 'desc' } }),
      prisma.event.findMany({
        // Drafts were never published
        where: { endTime: { lt: new Date() }, isDraft: false },
        orderBy: { startTime: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          image: true,
          startTime: true,
          endTime: true,
          location: true,
          eventType: true,
          maxRegistrations: true,
          isCancelled: true,
          _count: { select: { registrationList: true } },
        },
      }),
    ]);

    const events = [
      ...archived.map((event) => ({
        ...event,
        source: 'archive' as const,
        isCancelled: false,
      })),
      ...finished.map(({ _count, ...event }) => ({
        ...event,
        source: 'event' as const,
        sourceId: null,
        registrations: _count.registrationList,
      })),
    ].sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

    const pages = Math.max(1, Math.ceil(events.length / TAKE));
    const currentPage = Math.min(Math.max(page, 1), pages);

    return NextResponse.json(
      {
        events: events.slice((currentPage - 1) * TAKE, currentPage * TAKE),
        page: currentPage,
        pages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[api] /api/events/past', getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { GET };
