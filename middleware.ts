// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
// paths that require authentication or authorization

const requireAuth: string[] = ['/admin'];

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  if (requireAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    //check not logged in
    if (!token) {
      const url = new URL(`/api/auth/signin`, request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    //check if not authorized
    if (token.role !== 'ADMIN') {
      const url = new URL(`/403`, request.url);
      return NextResponse.rewrite(url);
    }
  }
  return res;
}
