import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Footer from '@components/Footer';
import Navigation from '@lib/components/Navigation';
import { SmallHeader } from '@lib/components/Header';
import ProfileImage from '@components/ProfileImage';
import Card from '@components/Card';

const Profil: NextPage = () => {
  const { status, data: session } = useSession({
    required: false,
  });

  if (status === 'loading') {
    return <>'Loading or not authenticated...'</>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Profil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <SmallHeader />

        <div className="flex flex-col z-10 max-w-screen-xl mb-32 w-full gap-6 transform -translate-y-10">
          <div className="w-full bg-white shadow-2xl rounded-2xl p-6">
            <div className="flex items-center">
              <div className="pl-10 py-8 text-left">
                <p>Navn Navnesen</p>
                <p className="text-slate-500">Medlem</p>
              </div>
            </div>

            <div>
              <Card />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profil;