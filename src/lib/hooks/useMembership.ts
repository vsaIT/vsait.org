import { useUser } from '@/lib/hooks/useUser';
import { getMembershipYear } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export function useIsMember() {
  const { status, data: session } = useSession({ required: false });
  const { user } = useUser(session?.user?.id);

  const memberships = user?.membership ?? session?.user.membership;
  const isMember = !!memberships?.some(
    ({ year }) => year === getMembershipYear()
  );

  return { isMember, status };
}

export function useShowMembershipBanner() {
  const { isMember, status } = useIsMember();
  return status !== 'loading' && !isMember;
}
