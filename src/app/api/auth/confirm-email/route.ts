import { NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { generateSalt } from '@/lib/auth/passwords';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Kode mangler' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        emailVerificationUrl: code,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Ugyldig eller utløpt kode' },
        { status: 400 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'Epost er allerede bekreftet!' },
        { status: 200 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        // Reset code after verified for security
        emailVerificationUrl: generateSalt(12),
      },
    });

    return NextResponse.json({ message: 'Epost bekreftet!' }, { status: 200 });
  } catch (error) {
    console.error('Error confirming email:', error);
    return NextResponse.json(
      { error: 'Noe gikk galt under bekreftelse av epost' },
      { status: 500 }
    );
  }
}
