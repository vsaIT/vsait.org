'use client';
import { PastEvents } from '@/components/Events';
import { CurvyHeader } from '@/components/Header';
import Link from 'next/link';

function PastEventsPage(): JSX.Element {
  return (
    <>
      <CurvyHeader title='Tidligere arrangementer' />

      <div className='relative z-10 mb-32 flex w-11/12 max-w-screen-xl flex-col gap-6'>
        <div className='text-left'>
          <Link
            href='/events'
            className='font-medium text-primary hover:underline'
          >
            ← Tilbake til arrangementer
          </Link>
        </div>

        <PastEvents />
      </div>
    </>
  );
}

export default PastEventsPage;
