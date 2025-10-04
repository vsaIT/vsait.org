import { Accordion } from '@/components/Accordion';
import { AttendingUserType } from '@/types';

interface CheckinListProps {
  attendances: AttendingUserType[];
}

export default function CheckinList({ attendances }: CheckinListProps) {
  return (
    <Accordion className='rounded-2xl bg-white shadow-2xl' startToggled>
      <div className='flex flex-col p-2 text-left'>
        <div className='flex w-full flex-col p-6'>
          <h2 className='mb-4 text-2xl font-bold'>Liste over påmeldte</h2>
          <div className='flex flex-col overflow-hidden rounded-lg bg-slate-100 text-xs'>
            <div className='mb-1 flex bg-light px-10 py-2 font-bold text-white'>
              <p className='w-1/4'>Navn</p>
              <p className='w-1/4'>E-post</p>
              <p className='w-1/4'>Matbehov</p>
              <p className='w-1/4'>Checked</p>
            </div>
            {attendances?.map((user: AttendingUserType) => (
              <div
                key={user.email}
                className='mx-1 mb-1 flex rounded-md bg-white px-9 py-2'
              >
                <p className='w-1/4'>{user.name}</p>
                <p className='w-1/4'>{user.email}</p>
                <p className='w-1/4'>{user.foodNeeds}</p>
                <p className='w-1/4'>{user.checked ? '✔️' : ''}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Accordion>
  );
}
