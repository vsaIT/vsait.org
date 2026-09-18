import { RegisteredUserType } from '@/types';

interface AdminRegistrationsListProps {
  registrations: RegisteredUserType[];
}

export default function AdminRegistrationsList({
  registrations,
}: AdminRegistrationsListProps) {
  return (
    <div className='rounded-3xl bg-white p-6 shadow-sm sm:p-8'>
      <h2 className='text-xl '>
        Liste over påmeldte ({registrations.length})
      </h2>

      {registrations.length === 0 ? (
        <p className='mt-4 text-sm text-gray'>Ingen påmeldte enda.</p>
      ) : (
        <div className='mt-4 overflow-x-auto'>
          <table className='w-full min-w-[32rem] border-separate border-spacing-0 text-left text-sm'>
            <thead>
              <tr className='text-[0.7rem] uppercase tracking-[0.14em] text-primary'>
                <th className='rounded-l-xl bg-primary/[0.06] px-4 py-3 font-normal'>
                  Navn
                </th>
                <th className='bg-primary/[0.06] px-4 py-3 font-normal'>E-post</th>
                <th className='rounded-r-xl bg-primary/[0.06] px-4 py-3 font-normal'>
                  Matbehov
                </th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((user: RegisteredUserType, index: number) => (
                <tr
                  key={`${user.email}-${index}`}
                  className='align-top [&:first-child>td]:border-t-0'
                >
                  <td className='border-t border-primary/10 px-4 py-3 '>
                    {user.name}
                  </td>
                  <td className='border-t border-primary/10 px-4 py-3 text-gray'>
                    {user.email || '—'}
                  </td>
                  <td className='border-t border-primary/10 px-4 py-3 text-gray'>
                    {user.foodNeeds || '—'}
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
