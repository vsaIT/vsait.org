import type { NextPage } from 'next';
import Head from 'next/head';
import { Navigation } from '@lib/components/Navigation';
import { AdminLayout } from '@lib/components/Admin';

const AdminMemberships: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Administrasjon medlemskap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center">
        <AdminLayout>
          <>
            <div className="flex w-full bg-white shadow-2xl rounded-2xl p-6">
              <h1 className="text-6xl font-bold">
                Welcome to the admin medlemskap
              </h1>
            </div>
          </>
        </AdminLayout>
      </main>
    </div>
  );
};

export default AdminMemberships;
