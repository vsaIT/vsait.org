import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@lib/components/Footer';
import Navigation from '@lib/components/Navigation';
import { SmallHeader } from '@lib/components/Header';
import RegistrationForm from '@lib/components/RegistrationForm';

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
