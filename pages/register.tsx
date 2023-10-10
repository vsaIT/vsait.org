import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@components/Footer';
import { Navigation } from '@lib/components/Navigation';
import { SmallHeader } from '@components/Header';
import { RegistrationForm } from '@components/Form';

const Registration: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Opprett bruker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center text-center">
        {/* @ts-expect-error Server Component */}
        <SmallHeader />
        {/* @ts-expect-error Server Component */}
        <RegistrationForm />
      </main>
    </div>
  );
};

export default Registration;
