import prisma from 'prisma';
import { getErrorMessage } from 'src/lib/utils';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const GET = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token || token.role !== 'ADMIN')
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      { status: 401 }
    );

  try {
    const memberships = await prisma.membership.findMany({
      orderBy: {
        year: 'desc',
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });
    return NextResponse.json(memberships, { status: 200 });
  } catch (error) {
    console.error(`[api] /api/memberships`, getErrorMessage(error));
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
