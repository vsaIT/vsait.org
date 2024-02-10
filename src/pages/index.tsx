import { EventsQuickView } from 'src/components/Events';
import { LargeHeader } from 'src/components/Header';
import { Button } from 'src/components/Input';
import Wave from 'src/components/Wave';
import { getMembershipYear } from 'src/lib/utils';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const Home: NextPage = () => {
  const { status, data: session } = useSession({
    required: false,
  });
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    initialInView: false,
  });
  const loading = status === 'loading';

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <LargeHeader
        ref={ref}
        className={`transition-all duration-1200 delay-150 ${
          inView && session ? 'max-h-128' : 'max-h-144'
        }`}
      >
        <>
          <div
            className={`flex flex-col justify-center items-center transition-all duration-700 ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {loading ? (
              <>laster inn...</>
            ) : session && status === 'authenticated' ? (
              <>
                <h1 className="text-4xl mb-1.5 font-bold text-white">
                  Velkommen tilbake {`${session?.user?.firstName}!`}
                </h1>
                <p className="w-9/12 text-white">
                  {session.user.mappedMembership?.includes(getMembershipYear()) ? (
                    <>
                      {`Medlemskap bekreftet for ${getMembershipYear()}/${
                        getMembershipYear() + 1
                      }`}
                    </>
                  ) : (
                    <>
                      {`Du er ikke medlem for skoleåret ${getMembershipYear()}`}
                    </>
                  )}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-7xl mb-1.5 font-bold text-white">VSAiT</h1>
                <p className="w-9/12 text-white">
                  VSAiT er en frivillig studentorganisasjon som ønsker å samle
                  det vietnamesiske studentmiljøet i Trondheim. Organisasjonen
                  retter seg mot studenter ved NTNU og andre
                  utdanningsinstitusjoner i Trondheim.
                </p>
                <div className="flex gap-5 py-10">
                  {/* TODO route to own page */}
                  <Link href="/login">
                    {/* @ts-expect-error Server Component */}
                    <Button text="Logg inn" className="rounded-3xl" inverted />
                  </Link>
                  {/*TODO Change to register when ready*/}
                  <Link href="/register">
                    {/* @ts-expect-error Server Component */}
                    <Button text="Register" className="rounded-3xl" />
                  </Link>
                </div>
              </>
            )}
          </div>
          {/* @ts-expect-error Server Component */}
          <Wave />
        </>
      </LargeHeader>

     
        <div
          className={`flex flex-col w-11/12 max-w-screen-lg justify-center p-4 -mb-24 bg-white shadow-lg rounded-2xl -translate-y-40 ${
            !session ? '!translate-y-0 !mb-12 shadow-none' : ''
          }`}
        >
          {/* @ts-expect-error Server Component */}
          <EventsQuickView
            className={`flex flex-col justify-center transition-all duration-700 delay-700 ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
    </>
  );
};

export default Home;
