import { AdminLayout } from '@lib/components/Admin';
import type { NextPage } from 'next';
import Head from 'next/head';

const AdminUsers: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Administrasjon brukere</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center">
        <AdminLayout>
          <>
            <div className="flex w-full bg-white shadow-2xl rounded-2xl p-6">
              <h1 className="text-6xl font-bold">Welcome to admin brukere</h1>{' '}
            </div>
          </>
        </AdminLayout>
      </main>
    </div>
  );
};

export default AdminUsers;
