import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma';
import { getErrorMessage } from 'src/lib/utils';

const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get('page');

  try {
    const [users, userCount] = await prisma.$transaction([
      prisma.user.findMany({
        include: {
          membership: true,
        },
        skip: (Number(page) - 1) * 9,
        take: 9,
      }),
      prisma.user.count(),
    ]);
    return NextResponse.json(
      { headers: { 'Cache-Control': 'max-age=120' }, users, userCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

const POST = async (req: NextRequest) => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { GET, POST };
