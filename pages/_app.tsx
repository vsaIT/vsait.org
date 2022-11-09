import '@lib/styles/globals.css';
import WithAuth from '@lib/auth/WithAuth';
import { SessionProvider } from 'next-auth/react';
import type { ExtendedAppProps } from '@lib/types';

const MyApp = ({ Component, pageProps }: ExtendedAppProps) => {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      {Component.auth ? (
        <WithAuth options={Component.auth}>
          <Component {...pageProps} />
        </WithAuth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

export default MyApp;
