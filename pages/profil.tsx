import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Footer from '@components/Footer';
import Navigation from '@lib/components/Navigation';
import { SmallHeader } from '@lib/components/Header';
import Card from '@components/Card';
import { useEffect, useState } from 'react';
import { UserType } from '@lib/types';

const Profil: NextPage = () => {
  const { status, data: session } = useSession({
    required: false,
  });

  const [user, setUser] = useState<UserType>({
    id: '',
    birthdate: '',
    email: '',
    firstName: '',
    foodNeeds: '',
    lastName: '',
    student: '',
  });

  const fetchUser = async () => {
    await fetch('/api/user/')
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  useEffect(() => {
    fetchUser().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
            <div className="flex flex-col ml-10 sm:ml-20 my-5 sm:my-10 text-left">
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p className="text-slate-500">Medlem</p>
            </div>

            <div className="my-8 sm:mx-10">
              <Card user={user} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profil;
