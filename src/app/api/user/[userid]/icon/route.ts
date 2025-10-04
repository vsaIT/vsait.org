import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { requireSelfOrAdmin } from '@/app/api/utils';

const POST = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  const body = await req.json();
  const userID = params.userid;
  const { seed } = body;

  const authResponse = await requireSelfOrAdmin(req, userID);
  if (authResponse) return authResponse;

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

const GET = async () => {
  return NextResponse.json('Method Not Allowed', {
    status: 405,
  });
};

export { GET, POST };
