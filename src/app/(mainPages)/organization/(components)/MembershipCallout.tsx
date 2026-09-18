'use client';
import { MembershipBanner } from '@/components/Home';
import { useShowMembershipBanner } from '@/lib/hooks/useMembership';

export default function MembershipCallout() {
  const showMembershipBanner = useShowMembershipBanner();
  if (!showMembershipBanner) return null;

  return (
    <div className='px-3 pb-16 sm:px-4'>
      <MembershipBanner />
    </div>
  );
}
