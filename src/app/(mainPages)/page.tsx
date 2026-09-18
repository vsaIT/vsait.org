'use client';
import { EventsQuickView } from '@/components/Events';
import { LargeHeader } from '@/components/Header';
import { CommunitySection, MembershipBanner } from '@/components/Home';
import FloatingIcon from '@/components/FloatingIcon';
import {
  CircleCheck,
  CircleExclamation,
  Sprout,
  Star,
} from '@/components/icons';
import Button from '@/components/Input/Button';
import Wave from '@/components/Wave';
import {
  useIsMember,
  useShowMembershipBanner,
} from '@/lib/hooks/useMembership';
import { getMembershipYear } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

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
  const { isMember } = useIsMember();
  const showMembershipBanner = useShowMembershipBanner();

  return (
    <>
      <LargeHeader
        ref={ref}
        className={`transition-all delay-150 duration-1200 ${
          inView && session ? 'max-h-128' : 'max-h-144'
        }`}
      >
        <>
          <FloatingIcon className='left-[6%] top-[75%] opacity-70 sm:left-[12%] sm:top-[50%]'>
            <Star color='#FFFFFF' className='h-8 w-8 sm:h-10 sm:w-10' />
          </FloatingIcon>
          <FloatingIcon className='right-[10%] top-[22%] opacity-50'>
            <Sprout color='#FFFFFF' className='h-7 w-7 sm:h-12 sm:w-12' />
          </FloatingIcon>

          <div
            className={`flex w-full flex-col items-center justify-center transition-all duration-700 ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {loading ? (
              <>laster inn...</>
            ) : session && status === 'authenticated' ? (
              <div className='relative flex w-full max-w-4xl flex-col items-center px-6'>
                <span
                  className={`mb-4 flex items-center gap-2 rounded-full px-4 py-1.5 text-center text-xs ${
                    isMember
                      ? 'border border-white/30 bg-white/15 text-white'
                      : 'bg-white text-primary shadow-sm'
                  }`}
                >
                  {isMember ? (
                    <CircleCheck
                      color='#FFFFFF'
                      className='h-3.5 w-3.5 shrink-0'
                    />
                  ) : (
                    <CircleExclamation
                      color='#D5564D'
                      className='h-3.5 w-3.5 shrink-0'
                    />
                  )}
                  {isMember
                    ? `Medlemskap bekreftet for ${membershipYear}/${membershipYear + 1}`
                    : `Ikke medlem for skoleåret ${membershipYear}/${membershipYear + 1}`}
                </span>

                <h1 className='mb-1.5 text-4xl text-white'>
                  Velkommen tilbake, {`${session.user.firstName}!`}
                </h1>
                <p className='text-sm text-white/90'>
                  Vietnamesisk studentforening i Trondheim
                </p>
                <div className='pointer-events-none absolute -right-16 top-1/2 hidden w-[24rem] -translate-y-[45%] select-none lg:block xl:-right-32 xl:w-[24rem]'>
                  <Image
                    src='/mascot.png'
                    alt='VSAiT maskot'
                    width={440}
                    height={440}
                    priority
                    className='h-auto w-full motion-safe:animate-float motion-safe:will-change-transform'
                  />
                </div>
              </div>
            ) : (
              <div className='relative flex w-full max-w-4xl flex-col items-center px-6'>
                <h1 className='mb-3 text-6xl tracking-wide text-white sm:text-7xl'>
                  VSAiT
                </h1>
                <p className='max-w-xl text-sm leading-relaxed text-white sm:text-base'>
                  VSAiT er en frivillig studentorganisasjon som ønsker å samle
                  det vietnamesiske studentmiljøet i Trondheim. Organisasjonen
                  retter seg mot studenter ved NTNU og andre
                  utdanningsinstitusjoner i Trondheim.
                </p>
                <div className='mt-8 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4'>
                  <Link href='/login'>
                    <Button
                      text='Logg inn'
                      className='w-full px-8 py-2.5 text-sm text-primary'
                      inverted
                    />
                  </Link>
                  <Link href='/register'>
                    <Button
                      text='Registrer deg'
                      className='w-full bg-[#BF4A3A] px-8 py-2.5 text-sm'
                    />
                  </Link>
                </div>
                <div className='pointer-events-none absolute -right-16 top-1/2 hidden w-[24rem] -translate-y-[40%] select-none lg:block xl:-right-32 xl:w-[24rem]'>
                  <Image
                    src='/mascot.png'
                    alt='VSAiT maskot'
                    width={440}
                    height={440}
                    priority
                    className='h-auto w-full motion-safe:animate-float motion-safe:will-change-transform'
                  />
                </div>
              </div>
            )}
          </div>

          <Wave rgb='253,248,240' />
        </>
      </LargeHeader>
      <section className='w-full bg-cream pb-16'>
        <div
          className={`mx-auto flex w-11/12 max-w-[58rem] flex-col gap-16 py-16 transition-all delay-700 duration-700 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <EventsQuickView />
          <CommunitySection />
        </div>

        {showMembershipBanner && (
          <div className='px-3 sm:px-4'>
            <MembershipBanner />
          </div>
        )}
      </section>
    </>
  );
}
