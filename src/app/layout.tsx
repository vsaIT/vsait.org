import LoadingIndicator from '@/components/LoadingIndicator';
import Providers from '@/app/Providers';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import '@/styles/globals.css';
import { CustomHead } from '@/components/CustomHead';
import { Sniglet } from 'next/font/google';

const sniglet = Sniglet({
  weight: ['400', '800'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sniglet',
});

export default function RootLayout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <html lang='no' className={sniglet.variable}>
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
