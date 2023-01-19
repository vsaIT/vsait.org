import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Footer from '@components/Footer';
import { Navigation } from '@lib/components/Navigation';
import { LargeHeader } from '@components/Header';
import { Button } from '@components/Button';
import Wave from '@components/Wave';
import { EventsQuickView } from '@components/Events';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { getMembershipYear } from '@lib/utils';

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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Hjemmeside</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
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
                <></>
              ) : session && status === 'authenticated' ? (
                <>
                  <h1 className="text-4xl mb-1.5 font-bold text-white">
                    Velkommen tilbake, {`${session?.user?.firstName}`}
                  </h1>
                  <p className="w-9/12 text-white">
                    {session?.user?.membership.includes(getMembershipYear()) ? (
                      <>
                        {`Medlemskap bekreftet for ${getMembershipYear()} / ${
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
                  <h1 className="text-7xl mb-1.5 font-bold text-white">
                    VSAiT
                  </h1>
                  <p className="w-9/12 text-white">
                    VSAiT er en frivillig studentorganisasjon som ønsker å samle
                    det vietnamesiske studentmiljøet i Trondheim. Organisasjonen
                    retter seg mot studenter ved NTNU og andre
                    utdanningsinstitusjoner i Trondheim.
                  </p>
                  <div className="flex gap-5 py-10">
                    <Link href="/login">
                      <a>
                        <Button
                          text="Logg inn"
                          className="rounded-3xl"
                          inverted
                        />
                      </a>
                    </Link>
                    <Link href="/register">
                      <a>
                        <Button text="Register" className="rounded-3xl" />
                      </a>
                    </Link>
                  </div>
                </>
              )}
            </div>
            <Wave />
          </>
        </LargeHeader>

        <div
          className={`flex flex-col w-11/12 max-w-screen-lg justify-center p-4 -mb-24 bg-white shadow-lg rounded-2xl -translate-y-40 ${
            !session ? '!translate-y-0 !mb-12 shadow-none' : ''
          }`}
        >
          <EventsQuickView
            className={`flex flex-col justify-center transition-all duration-700 delay-700 ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
