import { requireSelfOrAdmin } from '@/app/api/utils';
import { getErrorMessage } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';

const POST = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  const body = await req.json();
  const userID = params.userid;
  const { foodNeeds, student } = body;

  const authResponse = await requireSelfOrAdmin(req, userID);
  if (authResponse) return authResponse;

  try {
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        foodNeeds: foodNeeds,
        student: student,
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
