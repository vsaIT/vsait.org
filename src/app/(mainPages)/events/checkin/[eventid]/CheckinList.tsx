import StatusPill from '@/components/StatusPill';
import { AttendingUserType } from '@/types';

interface CheckinListProps {
  attendances: AttendingUserType[];
}

export default function CheckinList({ attendances }: CheckinListProps) {
  return (
    <div className='rounded-3xl bg-white p-6 text-left shadow-sm sm:p-8'>
      <h2 className='text-xl '>
        Liste over påmeldte ({attendances.length})
      </h2>

      {attendances.length === 0 ? (
        <p className='mt-4 text-sm'>Ingen påmeldte enda.</p>
      ) : (
        <div className='mt-4 overflow-x-auto'>
          <table className='w-full min-w-[36rem] border-separate border-spacing-0 text-left text-sm'>
            <thead>
              <tr className='text-[0.7rem] uppercase tracking-[0.14em] text-primary'>
                <th className='rounded-l-xl bg-primary/[0.06] px-4 py-3 font-normal'>
                  Navn
                </th>
                <th className='bg-primary/[0.06] px-4 py-3 font-normal'>
                  E-post
                </th>
                <th className='bg-primary/[0.06] px-4 py-3 font-normal'>
                  Matbehov
                </th>
                <th className='rounded-r-xl bg-primary/[0.06] px-4 py-3 font-normal'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((user) => (
                <tr
                  key={user.email}
                  className='align-top [&:first-child>td]:border-t-0'
                >
                  <td className='border-t border-primary/10 px-4 py-3 '>
                    {user.name}
                  </td>
                  <td className='border-t border-primary/10 px-4 py-3'>
                    {user.email || '—'}
                  </td>
                  <td className='border-t border-primary/10 px-4 py-3'>
                    {user.foodNeeds || '—'}
                  </td>
                  <td className='border-t border-primary/10 px-4 py-3'>
                    <StatusPill active={user.checked}>
                      {user.checked ? 'Innsjekket' : 'Ikke møtt'}
                    </StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
