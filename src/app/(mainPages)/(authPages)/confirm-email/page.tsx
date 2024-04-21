'use client';
import { SmallHeader } from '@/components/Header';
import { useSearchParams } from 'next/navigation';

function ConfirmEmail(): JSX.Element {
  const router = useSearchParams();
  const code = router.get('code');

  return (
    <>
      <SmallHeader />
      <p>Email confirmed liksom {code}</p>
    </>
  );
}

export default ConfirmEmail;
