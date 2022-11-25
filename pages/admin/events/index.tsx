import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@components/Footer';

const AdminEvents: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Administrasjon arrangementer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to the admin events</h1>
      </main>

      <Footer />
    </div>
  );
};

export default AdminEvents;
