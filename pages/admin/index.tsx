import type { NextPage } from 'next';
import Head from 'next/head';
import { AdminLayout } from '@lib/components/Admin';

const Admin: NextPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AdminLayout>
        <>
          <div className="flex flex-col p-6 w-full gap-6 h-screen">
            <div className="flex w-full gap-6 bg-white p-6 rounded-xl">
              <div className="shadow-md rounded-xl w-1/3 h-64 p-4">
                Events quickview
              </div>
              <div className="shadow-md rounded-xl w-1/3 h-64 p-4">
                Users quickview
              </div>
              <div className="shadow-md rounded-xl w-1/3 h-64 p-4">
                Memberships quickview
              </div>
            </div>
            <div className="bg-white rounded-xl w-full h-full p-6">
              <div className="flex w-full h-full gap-6">
                <div className="shadow-md rounded-xl w-8/12 h-full p-4">
                  Some statistics here
                </div>
                <div className="shadow-md rounded-xl w-4/12 h-full p-4">
                  Some statistics here
                </div>
              </div>
            </div>
          </div>
        </>
      </AdminLayout>
    </>
  );
};

export default Admin;
