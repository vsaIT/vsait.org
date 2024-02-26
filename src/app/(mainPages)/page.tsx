'use client';
import { useInView } from 'react-intersection-observer';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Button from '@/components/Input/Button';
import Wave from '@/components/Wave';
import { EventsQuickView } from '@/components/Events';
import { LargeHeader } from '@/components/Header';
import { getMembershipYear } from '@/lib/utils';

export default function Home() {
  const { status, data: session } = useSession({
    required: false,
  });
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    initialInView: false,
  });
  const loading = status === 'loading';
  const membershipYear = getMembershipYear();

  return (
    <>
      <LargeHeader
        ref={ref}
        className={`transition-all delay-150 duration-1200 ${
          inView && session ? 'max-h-128' : 'max-h-144'
        }`}
      >
        <>
          <div
            className={`flex flex-col items-center justify-center transition-all duration-700 ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {loading ? (
              <>laster inn...</>
            ) : session && status === 'authenticated' ? (
              <>
                <h1 className='mb-1.5 text-4xl font-bold text-white'>
                  Velkommen tilbake {`${session.user.firstName}!`}
                </h1>
                <p className='w-9/12 text-white'>
                  {session.user.membership.some(
                    ({ year }) => year === membershipYear
                  ) ? (
                    <>
                      {`Medlemskap bekreftet for ${membershipYear}/${
                        membershipYear + 1
                      }`}
                    </>
                  ) : (
                    <>{`Du er ikke medlem for skoleåret ${membershipYear}`}</>
                  )}
                </p>
              </>
            ) : (
              <>
                <h1 className='mb-1.5 text-7xl font-bold text-white'>VSAiT</h1>
                <p className='w-9/12 text-white'>
                  VSAiT er en frivillig studentorganisasjon som ønsker å samle
                  det vietnamesiske studentmiljøet i Trondheim. Organisasjonen
                  retter seg mot studenter ved NTNU og andre
                  utdanningsinstitusjoner i Trondheim.
                </p>
                <div className='flex gap-5 py-10'>
                  <Link href='/login'>
                    <Button text='Logg inn' className='rounded-3xl' inverted />
                  </Link>
                  <Link href='/register'>
                    <Button text='Register' className='rounded-3xl' />
                  </Link>
                </div>
              </>
            )}
          </div>

          <Wave />
        </>
      </LargeHeader>
      <div
        className={`-mb-24 flex w-11/12 max-w-screen-lg -translate-y-40 flex-col justify-center rounded-2xl bg-white p-4 shadow-lg ${
          !session ? '!mb-12 !translate-y-0 shadow-none' : ''
        }`}
      >
        <EventsQuickView
          className={`flex flex-col justify-center transition-all delay-700 duration-700 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </>
  );
}
