import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Form from '@lib/components/LoginForm';
import Footer from '@lib/components/Footer';
import Navigation from '@lib/components/Navigation';
import { LargeHeader } from '@lib/components/Header';
import { Button } from '@lib/components/Button';
import Wave from '@lib/components/Wave';
import { EventsDisplay } from '@lib/components/Events';

const Home: NextPage = () => {
  const { status, data: session } = useSession({
    required: false,
  });

  if (status === 'loading') {
    return <>'Loading or not authenticated...'</>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Hjemmeside</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <LargeHeader>
          <>
            <h1 className="text-7xl mb-1.5 font-bold text-white">VSAiT</h1>
            <p className="w-9/12 text-white">
              VSAiT er en frivillig studentorganisasjon som ønsker å samle det
              vietnamesiske studentmiljøet i Trondheim. Organisasjonen retter
              seg mot studenter ved NTNU og andre utdanningsinstitusjoner i
              Trondheim.
            </p>
            <div className="flex gap-5 py-10">
              <a href="/login">
                <Button text="Logg inn" className="rounded-3xl" />
              </a>
              <a href="/register">
                <Button text="Register" className="rounded-3xl" />
              </a>
            </div>
            <Wave />
          </>
        </LargeHeader>

        {/* {!session && <p>not logged in</p>}
        {session && (
          <p>
            Hello, {`${session?.user?.email}`} You can see this because you're
            logged in.
          </p>
        )}

        <Form /> */}
        <EventsDisplay />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
