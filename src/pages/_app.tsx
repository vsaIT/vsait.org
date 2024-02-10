import WithAuth from 'src/lib/auth/WithAuth';
import Footer from 'src/components/Footer';
import { Navigation } from 'src/components/Navigation';
import '@lib/styles/globals.css';
import type { ExtendedAppProps } from 'src/lib/types';
import { mapPageTitle } from 'src/lib/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: ExtendedAppProps) => {
  const currPath = useRouter().pathname;
  const AnyComponent = Component as any;
  const content = Component.auth ? (
    <>
      {/* @ts-expect-error Server Component */}
      <WithAuth options={Component.auth}>
        <AnyComponent {...pageProps} />
      </WithAuth>
    </>
  ) : (
    <AnyComponent {...pageProps} />
  );

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
        {/* @ts-expect-error Server Component */}
        <QueryClientProvider client={queryClient}>
          {/* @ts-expect-error Server Component */}
          <Navigation />
          <div className="flex min-h-screen flex-col items-center justify-center">
            <Head>
              <title>{mapPageTitle(currPath)}</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex w-full flex-1 flex-col items-center text-center">
              {content}
            </main>
          </div>
          {/* @ts-expect-error Server Component */}
          <Footer />
        </QueryClientProvider>
        {/* @ts-expect-error Server Component */}
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          closeOnClick
          pauseOnHover
        />
      </SessionProvider>
    </>
  );
};

export default MyApp;
