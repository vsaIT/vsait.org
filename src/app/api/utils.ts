import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function requireAdmin(
  req: NextRequest
): Promise<NextResponse | void> {
  const token = await getToken({ req: req });
  const isAdmin = token?.role === 'ADMIN';

  if (!token) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }
  if (!isAdmin) {
    return NextResponse.json(
      {
        message: 'Forbidden',
      },
      { status: 403 }
    );
  }
  return;
}

export async function requireSelfOrAdmin(
  req: NextRequest,
  userID: string
): Promise<NextResponse | void> {
  const token = await getToken({ req: req });

  if (!token) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }
  if (userID !== token?.id && token?.role !== 'ADMIN') {
    return NextResponse.json(
      {
        message: "Forbidden: Cannot access another user's data",
      },
      { status: 403 }
    );
  }
  return;
}
