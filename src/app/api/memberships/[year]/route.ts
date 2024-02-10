import prisma from 'prisma';
import { getErrorMessage } from 'src/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const GET = async (
  req: NextRequest,
  { params }: { params: { year: number } }
) => {
  const year = params.year;
  const token = await getToken({ req });

  if (!token || token?.role !== 'ADMIN')
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
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

const POST = async (req: NextRequest) => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { GET, POST };
