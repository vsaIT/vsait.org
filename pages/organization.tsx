import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@components/Footer';
import Navigation from '@lib/components/Navigation';
import { CurvyHeader } from '@lib/components/Header';
import Image from 'next/image';

const Organization: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | For bedrifter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <CurvyHeader title="Om oss" />
      </main>

      <Footer />
    </div>
  );
};

export default Organization;
