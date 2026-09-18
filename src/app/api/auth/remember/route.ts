import { getErrorMessage } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SESSION_COOKIE_NAMES = [
  'next-auth.session-token',
  '__Secure-next-auth.session-token',
];

const isSessionCookie = (name: string) =>
  SESSION_COOKIE_NAMES.some(
    (sessionCookie) =>
      name === sessionCookie || name.startsWith(`${sessionCookie}.`)
  );

const POST = async (req: NextRequest) => {
  try {
    const { remember } = (await req.json()) as { remember?: boolean };

    const response = NextResponse.json(
      { remember: Boolean(remember) },
      { status: 200 }
    );
    if (remember) return response;

    req.cookies
      .getAll()
      .filter((cookie) => isSessionCookie(cookie.name))
      .forEach((cookie) =>
        response.cookies.set({
          name: cookie.name,
          value: cookie.value,
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: cookie.name.startsWith('__Secure-'),
        })
      );

    return response;
  } catch (error) {
    console.error('[api] /api/auth/remember', getErrorMessage(error));
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { POST };
