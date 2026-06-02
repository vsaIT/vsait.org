import { getErrorMessage } from '@/lib/utils';
import { NextResponse } from 'next/server';
import prisma from 'prisma/index';

// This route serves the archive of past events, ordered by most recent first.
export const dynamic = 'force-dynamic';

// Returns the showcase archive of past events most recent first.
const GET = async () => {
  try {
    const events = await prisma.eventArchive.findMany({
      orderBy: {
        startTime: 'desc',
      },
    });
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error('[api] /api/events/archive', getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { GET };
