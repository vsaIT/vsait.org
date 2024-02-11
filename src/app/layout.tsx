'use client';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ReactNode, Suspense } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';
import Head from 'next/head';
import { mapPageTitle } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import Footer from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  const currPath = usePathname();
  return (
    <html lang='no'>
      <Head>
        <title>{currPath ? mapPageTitle(currPath) : 'Invalid url'}</title>
        <meta
          name='description'
          content='Vietnamese Student Association in Trondheim'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <SessionProvider refetchInterval={5 * 60}>
          <QueryClientProvider client={queryClient}>
            <Navigation />
            <div className='flex min-h-screen flex-col items-center justify-center'>
              <Suspense fallback={<LoadingIndicator />}>
                <main className='flex w-full flex-1 flex-col items-center text-center'>
                  {/* <WithAuth options={{redirectTo: "/login"}}> */}
                  {children}
                  {/* </WithAuth> */}
                </main>
              </Suspense>
            </div>
            <Footer />
          </QueryClientProvider>
          <ToastContainer />
        </SessionProvider>
      </body>
    </html>
  );
}
