import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@components/Footer';

const Registration: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>VSAiT | Opprett bruker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to registration</h1>
      </main>

      <Footer />
    </div>
  );
};

export default Registration;
