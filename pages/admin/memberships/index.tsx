import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@components/Footer';
import Navigation from '@lib/components/Navigation';
import { SmallHeader } from '@lib/components/Header';

const AdminMemberships: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Administrasjon medlemsskap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <SmallHeader />

        <div className="flex flex-col z-10 max-w-screen-xl mb-32 w-full gap-6 transform -translate-y-10">
          <div className="flex w-full bg-white shadow-2xl rounded-2xl p-6">
            <h1 className="text-6xl font-bold">
              Welcome to the admin membership
            </h1>
            <div></div>
            <div>
              <div></div>
              <div></div>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminMemberships;
