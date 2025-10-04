import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '../utils';

const GET = async (req: NextRequest) => {
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

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

const POST = async () => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { GET, POST };
