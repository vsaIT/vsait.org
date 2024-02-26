'use client';
import { Membership } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { User } from 'next-auth';
import { AdminMembershipsProps } from './membershipTypes';

function AdminMembershipsView({ params }: AdminMembershipsProps): JSX.Element {
  const { year } = params;

  const { isLoading, error, isFetching, data } = useQuery({
    queryKey: ['memberships', year],
    queryFn: () => fetch(`/api/memberships/${year}`).then((res) => res.json()),
    enabled: !!year,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });

  const membership: Membership & { user: User }[] = data;
  const loading = isLoading || isFetching;

  // Redirect to 404 if event not found
  if (!loading && !membership) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  return (
    <>
      <div className='flex h-screen w-full flex-col gap-6 p-6'>
        <div className='flex w-full justify-between gap-6 rounded-xl bg-white p-6'>
          <div className='flex flex-col'>
            <h1 className='text-xl font-medium'>Medlemskap {year}</h1>
            <p className='text-sm'>Se og endre medlemskap her</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminMembershipsView;
