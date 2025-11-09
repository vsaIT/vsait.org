import { getErrorMessage } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { requireAdmin } from '../../utils';

const GET = async (
  req: NextRequest,
  { params }: { params: { year: number } }
) => {
  const year = Number(params.year);
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

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

const POST = async (
  req: NextRequest,
  { params }: { params: { year: number } }
) => {
  const year = Number(params.year);
  const currentYear = new Date().getFullYear()
  const authResponse = await requireAdmin(req);
  if (authResponse) return authResponse;

  try {
    const membership = await prisma.membership.findFirst({
      where: {
        year: year,
      },
    });

    if (membership != null) {
      throw Error('Membership year already exists');
    }
    else if (year < currentYear || year > currentYear + 1) {
      throw Error('Cannot create membership year that is in the past or more than 1 years from now')
    }

    await prisma.membership.create({
      data: {
        year: year
      }
    });

    return NextResponse.json(
      { message: 'Membership year created' },
      { status: 201 }
    );

  } catch (error) {
    console.error(`[api] /api/membership`, getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }

};



export { GET, POST };
