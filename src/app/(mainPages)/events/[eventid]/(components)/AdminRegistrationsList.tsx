import { RegisteredUserType } from '@/types';

interface AdminRegistrationsListProps {
  registrations: RegisteredUserType[];
}

export default function AdminRegistrationsList({
  registrations,
}: AdminRegistrationsListProps) {
  return (
    <div className='flex flex-col text-left'>
      <div className='flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
        <h2 className='mb-4 text-2xl font-bold'>Liste over påmeldte</h2>
        <div className='flex flex-col overflow-hidden rounded-lg bg-slate-100 text-xs'>
          <div className='mb-1 flex bg-light px-10 py-2 font-bold text-white'>
            <p className='w-1/3'>Navn</p>
            <p className='w-1/3'>E-post</p>
            <p className='w-1/3'>Matbehov</p>
          </div>
          {registrations?.map((user: RegisteredUserType) => (
            <div
              key={user.email}
              className='mx-1 mb-1 flex rounded-md bg-white px-9 py-2'
            >
              <p className='w-1/3'>{user.name}</p>
              <p className='w-1/3'>{user.email}</p>
              <p className='w-1/3'>{user.foodNeeds}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
