import { AdminLayout } from '@lib/components/Admin';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const AdminEventsView: NextPage = () => {
  const router = useRouter();
  const { eventid } = router.query;

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AdminLayout>
        <>
          <div className="flex w-full bg-white shadow-2xl rounded-2xl p-6">
            <h1 className="text-6xl font-bold">
              Welcome to the admin arrangementer {eventid}
            </h1>
          </div>
        </>
      </AdminLayout>
    </>
  );
};

export default AdminEventsView;
