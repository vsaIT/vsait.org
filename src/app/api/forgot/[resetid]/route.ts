
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma';
import { getErrorMessage } from 'src/lib/utils';

const handler = async (req: NextRequest, { params }: {params: {resetid: string}}) => {
  const resetid = params.resetid;
  try {
    const user = await prisma.user.findFirst({
      where: {
        passwordResetUrl: String(resetid),
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('[api] /api/forgot/[resetid]', getErrorMessage(error));
    return NextResponse.json({ message: getErrorMessage(error) }, { status: 500 });
  }
};

export { handler as GET, handler as POST}
