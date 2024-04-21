import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const POST = async (
  req: NextRequest,
  { params }: { params: { userid: string } }
) => {
  const body = await req.json();
  const userID = params.userid;
  const { foodNeeds, student } = body;
  const token = await getToken({ req });

  if (!token)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (userID !== token?.id && token?.role !== 'ADMIN')
    return NextResponse.json(
      { message: 'Cannot register event for another user' },
      { status: 401 }
    );

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
