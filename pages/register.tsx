import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import { SmallHeader } from '@components/Header';
import { RegistrationForm } from '@components/Form';

const Registration: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Opprett bruker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <SmallHeader />

        <RegistrationForm />
      </main>

      <Footer />
    </div>
  );
};

export default Registration;
