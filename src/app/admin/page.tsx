function AdminDashboardPage(): JSX.Element {
  return (
    <>
      <div className='flex h-screen w-full flex-col gap-6 p-6'>
        <div className='flex w-full gap-6 rounded-xl bg-white p-6'>
          <div className='h-64 w-1/3 rounded-xl p-4 shadow-md'>
            Events quickview
          </div>
          <div className='h-64 w-1/3 rounded-xl p-4 shadow-md'>
            Users quickview
          </div>
          <div className='h-64 w-1/3 rounded-xl p-4 shadow-md'>
            Memberships quickview
          </div>
        </div>
        <div className='h-full w-full rounded-xl bg-white p-6'>
          <div className='flex h-full w-full gap-6'>
            <div className='h-full w-8/12 rounded-xl p-4 shadow-md'>
              Some statistics here
            </div>
            <div className='h-full w-4/12 rounded-xl p-4 shadow-md'>
              Some statistics here
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboardPage;
