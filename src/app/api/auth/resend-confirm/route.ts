import { NextResponse } from 'next/server';
import prisma from 'prisma/index';
import { sendConfirmEmail } from '../[...nextauth]/utils';
import { generateSalt } from '@/lib/auth/passwords';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Epost mangler' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      // Return success anyway
      return NextResponse.json(
        { message: 'Epost sendt om brukeren finnes' },
        { status: 200 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Epost er allerede bekreftet' },
        { status: 400 }
      );
    }
    // Generate new code
    const newCode = generateSalt(12);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationUrl: newCode,
      },
    });

    await sendConfirmEmail(
      `${updatedUser.firstName} ${updatedUser.lastName}`,
      updatedUser.email,
      updatedUser.emailVerificationUrl
    );

    return NextResponse.json({ message: 'Epost sendt' }, { status: 200 });
  } catch (error) {
    console.error('Error resending confirm email:', error);
    return NextResponse.json(
      { error: 'Noe gikk galt under utsending av epost' },
      { status: 500 }
    );
  }
}
