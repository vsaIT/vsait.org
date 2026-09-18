import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { getErrorMessage } from '@/lib/utils';
import { activeResetTokenWhere } from '@/lib/auth/resetTokens';

// Tells the reset page whether its link is still usable
const GET = async (
  _req: NextRequest,
  { params }: { params: { resetid: string } }
) => {
  const resetid = String(params.resetid ?? '');
  try {
    if (!resetid) return NextResponse.json(null, { status: 200 });

    const user = await prisma.user.findFirst({
      where: activeResetTokenWhere(resetid),
      select: {
        id: true,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('[api] /api/forgot/[resetid]', getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { GET };
