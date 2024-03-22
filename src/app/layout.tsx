import LoadingIndicator from '@/components/LoadingIndicator';
import Providers from '@/app/Providers';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import { CustomHead } from '@/components/CustomHead';

export default function RootLayout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <html lang='no'>
      <CustomHead />
      <body>
        <Providers>
          <Suspense fallback={<LoadingIndicator />}>{children}</Suspense>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
