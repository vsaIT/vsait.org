import Footer from '@/components/Footer';
import Head from '@/components/Head';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Navigation } from '@/components/Navigation';
import '@/styles/globals.css';
import { ReactNode, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Providers from './Providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='no'>
      <Head />
      <body>
        <Providers>
          <Navigation />
          <div className='flex min-h-screen flex-col items-center justify-center'>
            <Suspense fallback={<LoadingIndicator />}>
              <main className='flex w-full flex-1 flex-col items-center text-center'>
                {children}
              </main>
            </Suspense>
          </div>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
