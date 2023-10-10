import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AdminLayout } from '@lib/components/Admin';

const AdminUsersEdit: NextPage = () => {
  const router = useRouter();
  const { userid } = router.query;

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AdminLayout>
        <>
          <div className="flex w-full bg-white shadow-2xl rounded-2xl p-6">
            <h1 className="text-6xl font-bold">
              Welcome to the admin users {userid}
            </h1>
          </div>
        </>
      </AdminLayout>
    </>
  );
};

export default AdminUsersEdit;
