import { generateSalt, hashPassword } from '@/lib/auth/passwords';
import { getErrorMessage } from '@/lib/utils';
import { UserType } from '@/types';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { requireAdmin } from '../utils';

const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get('page');
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

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
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

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
