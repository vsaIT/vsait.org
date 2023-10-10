import { AdminLayout } from '@lib/components/Admin';

const NewUserPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AdminLayout>
        <>
          <div className="flex flex-col p-6 w-full gap-6 h-screen">
            <div className="shadow-md rounded-xl w-full h-64 p-4">New user</div>
          </div>
        </>
      </AdminLayout>
    </>
  );
};

export default NewUserPage;
