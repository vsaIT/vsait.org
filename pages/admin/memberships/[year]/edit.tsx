import { AdminLayout } from '@lib/components/Admin';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const AdminMembershipsEdit: NextPage = () => {
  const router = useRouter();
  const { membershipid } = router.query;

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AdminLayout>
        <>
          <div className="flex w-full bg-white shadow-2xl rounded-2xl p-6">
            <h1 className="text-6xl font-bold">
              Welcome to the admin medlemskap {membershipid}
            </h1>
          </div>
        </>
      </AdminLayout>
    </>
  );
};

export default AdminMembershipsEdit;
