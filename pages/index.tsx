import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Form from '@lib/components/Form';
import Footer from '@components/Footer';

const Home: NextPage = () => {
  const { status, data: session } = useSession({
    required: false,
  });

  if (status === 'loading') {
    return <>'Loading or not authenticated...'</>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>VSAiT | Hjemmeside</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        {!session && <p>not logged in</p>}
        {session && (
          <p>
            Hello, {`${session?.user?.email}`} You can see this because you're
            logged in.
          </p>
        )}

        <Form />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
