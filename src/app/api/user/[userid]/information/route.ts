import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma';
import { getErrorMessage } from 'src/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const POST = async (req: NextRequest) => {
  const body = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const userID = searchParams.get('userid') as string;
  const { foodNeeds, student, publicProfile } = body;
  const token = await getToken({ req });

  if (!token || !token?.user)
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
        publicProfile: publicProfile,
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
