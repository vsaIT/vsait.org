import '@lib/styles/globals.css';
import type { ExtendedAppProps } from '@lib/types';
import WithAuth from '@lib/auth/WithAuth';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <QueryClientProvider client={queryClient}>{content}</QueryClientProvider>
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
  );
};

export default MyApp;
