import { RegisteredUserType } from '@/types';

interface AdminRegistrationsListProps {
  registrations: RegisteredUserType[];
  waiting?: RegisteredUserType[];
}

function UserTable({
  users,
  showPosition = false,
}: {
  users: RegisteredUserType[];
  showPosition?: boolean;
}) {
  return (
    <div className='mt-4 overflow-x-auto'>
      <table className='w-full min-w-[32rem] border-separate border-spacing-0 text-left text-sm'>
        <thead>
          <tr className='text-[0.7rem] uppercase tracking-[0.14em] text-primary'>
            {showPosition && (
              <th className='w-12 rounded-l-xl bg-primary/[0.06] px-4 py-3 font-normal'>
                Nr
              </th>
            )}
            <th
              className={`bg-primary/[0.06] px-4 py-3 font-normal ${
                showPosition ? '' : 'rounded-l-xl'
              }`}
            >
              Navn
            </th>
            <th className='bg-primary/[0.06] px-4 py-3 font-normal'>E-post</th>
            <th className='rounded-r-xl bg-primary/[0.06] px-4 py-3 font-normal'>
              Matbehov
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: RegisteredUserType, index: number) => (
            <tr
              key={`${user.email}-${index}`}
              className='align-top [&:first-child>td]:border-t-0'
            >
              {showPosition && (
                <td className='border-t border-primary/10 px-4 py-3 text-gray'>
                  {index + 1}
                </td>
              )}
              <td className='whitespace-nowrap border-t border-primary/10 px-4 py-3'>
                {user.name}
              </td>
              <td className='whitespace-nowrap border-t border-primary/10 px-4 py-3 text-gray'>
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
  );
}

export default function AdminRegistrationsList({
  registrations,
  waiting = [],
}: AdminRegistrationsListProps) {
  return (
    <div className='rounded-3xl bg-white p-6 shadow-sm sm:p-8'>
      <h2 className='text-xl '>Liste over påmeldte ({registrations.length})</h2>

      {registrations.length === 0 ? (
        <p className='mt-4 text-sm text-gray'>Ingen påmeldte enda.</p>
      ) : (
        <UserTable users={registrations} />
      )}

      {waiting.length > 0 && (
        <div className='mt-8 border-t border-primary/10 pt-6'>
          <h3 className='text-lg '>Venteliste ({waiting.length})</h3>
          <p className='mt-1 text-xs text-gray'>
            Sortert etter kø. Nestemann får plass når noen melder seg av.
          </p>
          <UserTable users={waiting} showPosition />
        </div>
      )}
    </div>
  );
}
