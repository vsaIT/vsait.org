import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AdminLayout } from '@lib/components/Admin';
import { EventType } from '@lib/types';
import { useQuery } from '@tanstack/react-query';

const AdminEventsEdit: NextPage = () => {
  const router = useRouter();
  const { eventid } = router.query;

  const { isLoading, error, isFetching, data } = useQuery({
    queryKey: ['memberships', eventid],
    queryFn: () => fetch(`/api/events/${eventid}`).then((res) => res.json()),
    enabled: !!eventid,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });

  const event: EventType = data?.event;
  const loading = isLoading || isFetching;

  // Redirect to 404 if event not found
  if (!loading && !event) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Administrasjon arrangementer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center">
        <AdminLayout>
          <>
            <div className="flex flex-col p-6 w-full gap-6 h-screen">
              <div className="flex w-full gap-6 bg-white p-6 rounded-xl justify-between">
                <div className="flex flex-col">
                  <h1 className="text-xl font-medium">
                    Endre arrangement: {eventid}
                  </h1>
                  <p className="text-sm">Se og endre arrangement her</p>
                </div>
              </div>

              <div className="bg-white rounded-xl w-full h-full p-6">
                <div className="flex justify-between items-center pb-6">
                  <div></div>
                </div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-2 rounded-lg border border-neutral-300 overflow-hidden">
                    {/* MAIN */}
                    <div>Generell informasjon</div>
                    <div>Datoinformasjon</div>
                  </div>
                  <div className="rounded-lg border border-neutral-300 overflow-hidden">
                    <div>Registreringsinformasjon</div>
                  </div>
                  <div className="rounded-lg border border-neutral-300 overflow-hidden">
                    <div>Informasjon om venteliste</div>
                  </div>
                  <div className="rounded-lg border border-neutral-300 overflow-hidden">
                    <div>Informasjon om innsjekk/oppmøte</div>
                  </div>
                  <div className="flex justify-between items-end gap-2">
                    Footer with buttons
                  </div>
                </div>
              </div>
            </div>
          </>
        </AdminLayout>
      </main>
    </div>
  );
};

export default AdminEventsEdit;
