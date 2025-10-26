import { UserType } from '@/types';
import { Session } from 'next-auth';

/**
 * Updates the session user fields with new user data.
 * Example usage: updateUserSession(session, user, ['membership', ...])
 * @param session - The session object to update.
 * @param user - The user object containing new data.
 * @param fields - The fields to update in the session.
 * @returns void
 */
export function updateUserSession<K extends keyof UserType>(
  session: Session | null,
  user: UserType | null,
  fields: K[]
) {
  if (!session || !user) return;

  fields.forEach((field) => {
    session.user[field] = user[field];
  });
}
