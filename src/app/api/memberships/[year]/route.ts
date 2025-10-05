import { getErrorMessage } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { requireAdmin } from '../../utils';

const GET = async (
  req: NextRequest,
  { params }: { params: { year: number } }
) => {
  const year = Number(params.year);
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

  try {
    const membership = await prisma.membership.findFirst({
      where: {
        year: year,
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(membership, { status: 200 });
  } catch (error) {
    console.error(`[api] /api/membership`, getErrorMessage(error));
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
