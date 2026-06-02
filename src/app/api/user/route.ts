import { generateSalt, hashPassword } from '@/lib/auth/passwords';
import { getErrorMessage } from '@/lib/utils';
import { UserType } from '@/types';
import { Prisma } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { requireAdmin } from '../utils';

// GET handler for fetching users with pagination and search
const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get('page');
  const search = req.nextUrl.searchParams.get('search')?.trim();
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

  // Construct the Prisma where clause based on the optional search query
  const where: Prisma.UserWhereInput = search
    ? {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  try {
    const [users, userCount] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        include: {
          membership: true,
        },
        skip: (Number(page) - 1) * 9,
        take: 9,
      }),
      prisma.user.count({ where }),
    ]);
    return NextResponse.json(
      { headers: { 'Cache-Control': 'max-age=120' }, users, userCount },
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

// POST handler for creating a new user
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
