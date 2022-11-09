import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@lib/components/Footer';
import { useRouter } from 'next/router';

const AdminEventsView: NextPage = () => {
  const router = useRouter();
  const { eventid } = router.query;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>VSAiT | Administrasjon arrangementer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to the admin events {eventid}
        </h1>
      </main>

      <Footer />
    </div>
  );
};

export default AdminEventsView;
