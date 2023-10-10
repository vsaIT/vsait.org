import WithAuth from '@lib/auth/WithAuth';
import Footer from '@lib/components/Footer';
import { Navigation } from '@lib/components/Navigation';
import '@lib/styles/globals.css';
import type { ExtendedAppProps } from '@lib/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: ExtendedAppProps) => {
  const AnyComponent = Component as any;
  const content = Component.auth ? (
    <WithAuth options={Component.auth}>
      <AnyComponent {...pageProps} />
    </WithAuth>
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
          {content}
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
