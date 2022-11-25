import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@components/Footer';
import { useRouter } from 'next/router';

const AdminMembershipsView: NextPage = () => {
  const router = useRouter();
  const { membershipid } = router.query;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Administrasjon medlemsskap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to the admin memberships {membershipid}
        </h1>
      </main>

      <Footer />
    </div>
  );
};

export default AdminMembershipsView;
