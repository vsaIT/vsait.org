'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const BUTTON =
  'mt-4 block w-full rounded-full bg-primary px-5 py-2 text-center text-xs text-white shadow-sm transition-all duration-300 hover:brightness-90 sm:inline-block sm:w-fit';

  export default function MembershipStatusLink() {
  const { status } = useSession({ required: false });

  if (status === 'loading') {
    return (
      <span aria-hidden className={`${BUTTON} invisible`}>
        Se profilen din →
      </span>
    );
  }

  const isSignedIn = status === 'authenticated';

  return (
    <Link href={isSignedIn ? '/profile' : '/register'} className={BUTTON}>
      {isSignedIn ? 'Se profilen din →' : 'Registrer deg først →'}
    </Link>
  );
}
