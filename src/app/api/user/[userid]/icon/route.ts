import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma';
import { getErrorMessage } from 'src/lib/utils';

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const body = await req.json();
  const userID = searchParams.get('userid') as string;
  const { seed } = body;
  const token = await getToken({ req });

  if (!token)
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  if (userID !== token?.id && token?.role !== 'ADMIN')
    return NextResponse.json(
      {
        message: 'Cannot register event for another user',
      },
      { status: 401 }
    );

  try {
    if (!seed) throw new Error('Request body seed is required');

    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        profileIconSeed: String(seed),
      },
    });
    return NextResponse.json(
      {
        message: 'updated',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

const GET = async (req: NextRequest) => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { GET, POST };
