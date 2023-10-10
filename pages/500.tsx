import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@components/Footer';
import { Navigation } from '@lib/components/Navigation';
import { LargeHeader } from '@components/Header';
import Wave from '@components/Wave';

const Custom500: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | 500</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center text-center">
        {/* @ts-expect-error Server Component */}
        <LargeHeader>
          <>
            <h1 className="text-7xl mb-1.5 font-bold text-white">500</h1>
            <p className="w-9/12 text-white">Server-side error occurred...</p>
            {/* @ts-expect-error Server Component */}
            <Wave />
          </>
        </LargeHeader>
      </main>
    </div>
  );
};

export default Custom500;
