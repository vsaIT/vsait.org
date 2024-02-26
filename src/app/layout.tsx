import Head from '@/components/Head';
import LoadingIndicator from '@/components/LoadingIndicator';
import Providers from '@/components/Providers';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <html lang='no'>
      <Head />
      <body>
        <Providers>
          <Suspense fallback={<LoadingIndicator />}>{children}</Suspense>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
