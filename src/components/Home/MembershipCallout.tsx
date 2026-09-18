'use client';
import { useShowMembershipBanner } from '@/lib/hooks/useMembership';
import MembershipBanner from './MembershipBanner';

export default function MembershipCallout({
  className = 'px-3 pb-16 sm:px-4',
}: {
  className?: string;
}) {
  const showMembershipBanner = useShowMembershipBanner();
  if (!showMembershipBanner) return null;

  return (
    <div className={className}>
      <MembershipBanner />
    </div>
  );
}
