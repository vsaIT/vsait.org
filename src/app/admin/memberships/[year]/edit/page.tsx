import { AdminMembershipsProps } from '../membershipTypes';

function AdminMembershipsEdit({ params }: AdminMembershipsProps): JSX.Element {
  const { year } = params;

  return (
    <>
      <div className='flex w-full rounded-2xl bg-white p-6 shadow-2xl'>
        <h1 className='text-6xl font-bold'>
          Welcome to the admin medlemskap {year}
        </h1>
      </div>
    </>
  );
}

export default AdminMembershipsEdit;
