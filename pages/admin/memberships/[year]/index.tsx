import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AdminLayout } from '@lib/components/Admin';
import { useQuery } from '@tanstack/react-query';
import { Membership } from '@prisma/client';
import { User } from 'next-auth';

const AdminMembershipsView: NextPage = () => {
  const router = useRouter();
  const { year } = router.query;

  const { isLoading, error, isFetching, data } = useQuery({
    queryKey: ['memberships', year],
    queryFn: () => fetch(`/api/memberships/${year}`).then((res) => res.json()),
    enabled: !!year,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });

  const membership: Membership & { user: User } = data;
  const loading = isLoading || isFetching;

  // Redirect to 404 if event not found
  if (!loading && !membership) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  console.log(membership);

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AdminLayout>
        <>
          <div className="flex flex-col p-6 w-full gap-6 h-screen">
            <div className="flex w-full gap-6 bg-white p-6 rounded-xl justify-between">
              <div className="flex flex-col">
                <h1 className="text-xl font-medium">Medlemskap {year}</h1>
                <p className="text-sm">Se og endre medlemskap her</p>
              </div>
            </div>
          </div>
        </>
      </AdminLayout>
    </>
  );
};

export default AdminMembershipsView;
