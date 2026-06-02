import { getErrorMessage } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { requireAdmin } from '../../utils';

// Fetch users for a specific membership year with pagination and search
const GET = async (
  req: NextRequest,
  { params }: { params: { year: number } }
) => {
  const year = Number(params.year);
  const page = Number(req.nextUrl.searchParams.get('page')) || 1;
  const search = req.nextUrl.searchParams.get('search')?.trim();
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

  // Construct the Prisma where clause based on the year and optional search query
  const where: Prisma.UserWhereInput = {
    membership: { some: { year } },
    ...(search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {}),
  };

  try {
    const [users, userCount] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip: (page - 1) * 9,
        take: 9,
      }),
      prisma.user.count({ where }),
    ]);
    return NextResponse.json({ users, userCount }, { status: 200 });
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
