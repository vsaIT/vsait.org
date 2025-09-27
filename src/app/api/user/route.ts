import { NextRequest, NextResponse } from 'next/server';
import prisma, { Membership } from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import { getToken } from 'next-auth/jwt';
import { hashPassword, generateSalt } from '@/lib/auth/passwords';
import { sendConfirmEmail } from '../auth/[...nextauth]/utils';
import { UserType } from '@/types';

const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get('page');

  const token = await getToken({ req });
  if (!token)
    return NextResponse.json(
      {
        message: 'Unauthenticated',
      },
      { status: 407 }
    );
  if (token?.role !== 'ADMIN')
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      { status: 401 }
    );

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
  const token = await getToken({ req });
  console.log(`Processing POST /user request for ${token?.email}`);
  if (!token)
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 407 });
  if (token?.role !== 'ADMIN')
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const body = (await req.json()) as UserType;
    const {
      firstName,
      lastName,
      email,
      profileIconSeed,
      password,
      foodNeeds,
      student,
      membership,
      pendingMembership,
      emailVerified,
      role,
    } = body;

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { message: 'A user with the same email exists' },
        { status: 409 }
      );
    }

    const hashedPassword = hashPassword(password, 12);
    const emailVerificationUrl = generateSalt(12);
    const passwordResetUrl = generateSalt(12);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        foodNeeds,
        profileIconSeed,
        student,
        pendingMembership,
        emailVerified,
        role,
        emailVerificationUrl,
        passwordResetUrl,
        membership: {
          connect: membership,
        },
      },
      include: { membership: true },
    });
    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { GET, POST };
