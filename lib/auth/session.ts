import { DefaultSession } from 'next-auth';
import {
  getSession as getNextSession,
  GetSessionParams,
} from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next/types';

type DefaultSessionUser = NonNullable<DefaultSession['user']>;

type SessionUser = DefaultSessionUser & {
  id: string;
  role: string;
};

export type Session = DefaultSession & {
  user?: SessionUser;
};

export async function getSession(
  options: GetSessionParams
): Promise<Session | null> {
  const session = await getNextSession(options);

  // that these are equal are ensured in `[...nextauth]`'s callback
  return session as Session | null;
}

export async function checkAllowed(
  req: NextApiRequest,
  res: NextApiResponse,
  window: Window
) {
  const session = await getSession({ req });
  console.log(session);
  if (!session || !session?.user || session?.user?.role !== 'ADMIN')
    window.location.href = '/401';
  return res.status(401).json({
    statusCode: 401,
    message: 'Unauthorized',
  });
}
