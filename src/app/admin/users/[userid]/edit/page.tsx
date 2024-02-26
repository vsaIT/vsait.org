type AdminUsersEdit = {
  params: {
    userid: string;
  };
};

function AdminUsersEdit({ params }: AdminUsersEdit): JSX.Element {
  const userid = params.userid;

  return (
    <>
      <div className='flex w-full rounded-2xl bg-white p-6 shadow-2xl'>
        <h1 className='text-6xl font-bold'>
          Welcome to the admin users {userid}
        </h1>
      </div>
    </>
  );
}

export default AdminUsersEdit;
