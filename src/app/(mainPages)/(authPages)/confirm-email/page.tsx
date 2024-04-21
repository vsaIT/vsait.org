'use client';
import { SmallHeader } from '@/components/Header';
import { Button } from '@/components/Input';
import ToastMessage from '@/components/Toast';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function ConfirmEmail(): JSX.Element {
  const router = useSearchParams();
  const code = router.get('code');
  const [email, setEmail] = useState('');
  const [count, setCount] = useState(0);
  const [isDisabled, setDisabled] = useState(false);

  // Countdown logic
  useEffect(() => {
    if (count > 0) {
      const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [count]);

  // Button enabling logic
  useEffect(() => {
    if (count === 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [count]);

  if (!code) {
    return (
      <>
        <SmallHeader />
        <div className='w-full py-2'>
          <p>Sjekk din epost for å bekrefte din bruker</p>
          <p>Har du ikke mottatt eposten?</p>
          <span className='my-2 flex max-h-10 w-full justify-center space-x-1'>
            <input
              type='email'
              placeholder='Din epost'
              className='border-gray-300 w-1/3 rounded-lg border px-2'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              text={
                count > 0 ? `Send på nytt om ${count} sekunder` : 'Send på nytt'
              }
              onClick={() => {
                console.log(email);
                ToastMessage({ type: 'success', message: 'Epost sendt' });
                setCount(5);
              }}
              disabled={isDisabled}
              className={
                isDisabled ? 'bg-zinc-300 disabled:pointer-events-none' : ''
              }
            />
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <SmallHeader />
      <p>Email confirmed liksom {code}</p>
    </>
  );
}

export default ConfirmEmail;
