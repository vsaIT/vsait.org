import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Footer from '@components/Footer';

const Profile: NextPage = () => {
  const { status, data: session } = useSession({
    required: false,
  });

  if (status === 'loading') {
    return <>'Loading or not authenticated...'</>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>VSAiT | Profil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to your profile {`${session?.user?.email}`}
        </h1>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
