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

  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState<
    null | 'success' | 'error'
  >(null);
  const [confirmMessage, setConfirmMessage] = useState('');

  // Countdown timer for resend button
  useEffect(() => {
    if (count > 0) {
      const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [count]);

  // Enable resend button when count reaches 0
  useEffect(() => {
    if (count === 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [count]);

  useEffect(() => {
    if (code) {
      setIsConfirming(true);
      fetch('/api/auth/confirm-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            setConfirmStatus('success');
            setConfirmMessage(data.message || 'Epost bekreftet!');
          } else {
            setConfirmStatus('error');
            setConfirmMessage(data.error || 'Kunne ikke bekrefte epost.');
          }
        })
        .catch(() => {
          setConfirmStatus('error');
          setConfirmMessage('Noe gikk galt. Prøv igjen senere.');
        })
        .finally(() => {
          setIsConfirming(false);
        });
    }
  }, [code]);

  // Resend confirmation email handler
  const handleResend = async () => {
    if (!email) {
      ToastMessage({ type: 'error', message: 'Vennligst fyll inn epost' });
      return;
    }
    setDisabled(true);
    try {
      const res = await fetch('/api/auth/resend-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        ToastMessage({ type: 'success', message: 'Epost har blitt sendt!' });
        setCount(60);
      } else {
        ToastMessage({
          type: 'error',
          message: data.error || 'Kunne ikke sende epost',
        });
        setDisabled(false);
      }
    } catch (err) {
      ToastMessage({ type: 'error', message: 'Noe gikk galt' });
      setDisabled(false);
    }
  };

  if (!code || confirmStatus === 'error') {
    return (
      <>
        <SmallHeader />
        <div className='flex min-h-[50vh] w-full flex-col items-center justify-center py-2'>
          <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-xl'>
            <h1 className='mb-4 text-center text-2xl font-bold'>
              Bekreft Epost
            </h1>
            {confirmStatus === 'error' && (
              <div className='mb-6 rounded bg-red-100 p-4 text-center font-medium text-red-800'>
                {confirmMessage}
              </div>
            )}
            <p className='text-gray-600 mb-6 text-center'>
              Sjekk din epost for å bekrefte din bruker. <br />
              Har du ikke mottatt eposten? Fyll inn eposten, så blir den sendt
              på nytt.
            </p>
            <div className='flex flex-col space-y-4'>
              <input
                type='email'
                placeholder='din-epost@stud.ntnu.no'
                className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-sm leading-6 outline-none'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                text={count > 0 ? `Send på nytt om ${count}s` : 'Send på nytt'}
                onClick={handleResend}
                disabled={isDisabled}
                className={`w-full ${isDisabled ? 'bg-stone-300 disabled:pointer-events-none' : ''}`}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SmallHeader />
      <div className='flex min-h-[50vh] w-full flex-col items-center justify-center py-2'>
        <div className='w-full max-w-md rounded-xl bg-white p-8 text-center shadow-xl'>
          {isConfirming ? (
            <>
              <h1 className='mb-4 text-2xl font-bold'>Bekrefter...</h1>
              <p className='text-gray-600'>
                Vennligst vent mens vi bekrefter din epost.
              </p>
            </>
          ) : confirmStatus === 'success' ? (
            <>
              <div className='mb-4 flex justify-center text-green-500'>
                <svg
                  className='h-16 w-16'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h1 className='mb-4 text-2xl font-bold'>Vellykket!</h1>
              <p className='text-gray-600 mb-6'>{confirmMessage}</p>
              <a
                href='/login'
                className='inline-block w-full rounded-md bg-primary px-6 py-3 text-center font-semibold text-white shadow-sm transition-colors hover:brightness-95'
              >
                Gå til innlogging
              </a>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ConfirmEmail;
