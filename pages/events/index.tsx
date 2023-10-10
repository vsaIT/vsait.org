import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@components/Footer';
import { Navigation } from '@lib/components/Navigation';
import { CurvyHeader } from '@lib/components/Header';
import { EventType } from '@lib/types';
import Image from 'next/image';
import { Calendar, Person, Place } from '@lib/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { EventsDisplaySkeleton } from '@lib/components/Events';
import Link from 'next/link';

const fetchProjects = async (page = 0) => {
  const data = await fetch(`/api/events?page=${page}`).then((res) =>
    res.json()
  );
  return data;
};

const Events: NextPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { page: pageParam } = router.query;
  const [page, setPage] = useState(Number(pageParam) || 1);

  const { isLoading, error, isFetching, data, isPreviousData } = useQuery({
    queryKey: ['events', page],
    queryFn: () => fetchProjects(page),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });

  useEffect(() => {
    if (!isPreviousData && data?.page < data?.pages) {
      queryClient.prefetchQuery({
        queryKey: ['projects', page + 1],
        queryFn: () => fetchProjects(page + 1),
      });
    }
  }, [data, isPreviousData, page, queryClient]);

  if (error) return <p>{'An error has occurred: ' + error}</p>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Arrangementer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <CurvyHeader title="Arrangementer" />

        <div className="events relative flex flex-col z-10 max-w-screen-xl gap-6 w-11/12 mb-8">
          {isLoading || isFetching || !data?.events
            ? new Array(3)
                .fill(0)
                .map((_, index: number) => (
                  <EventsDisplaySkeleton key={index} />
                ))
            : data?.events?.map((event: EventType, index: number) => (
                <Link href={`/events/${event.id}`} key={index}>
                  <div className="p-3 border-2 border-primary rounded-2xl">
                    <div className="relative grid grid-cols-layout w-full mx-auto bg-white shadow-lg rounded-2xl p-3 gap-3">
                      <div className="flex w-full">
                        <div className="w-full rounded-l-2xl overflow-hidden">
                          <Image
                            src={event.image}
                            alt="Vercel Logo"
                            width={1352}
                            height={564}
                            layout="responsive"
                          />
                        </div>
                      </div>
                      <div className="w-full h-full bg-primary rounded-lg"></div>
                      <div className="flex flex-col w-full text-left">
                        <h2 className="font-bold text-2xl mb-3">
                          {event.title}
                        </h2>
                        <div className="flex flex-col gap-3">
                          <div className="grid grid-cols-event gap-3">
                            <Calendar className="justify-self-center" />
                            <p className="flex flex-col justify-center">
                              {new Date(event.startTime).toDateString()} -{' '}
                              {new Date(event.endTime).toDateString()}
                            </p>
                          </div>

                          <div className="grid grid-cols-event gap-3">
                            <Place className="justify-self-center" />
                            <p className="flex flex-col justify-center">
                              {event.location}
                            </p>
                          </div>
                          <div className="grid grid-cols-event gap-3">
                            <Person className="justify-self-center" />
                            <p className="flex flex-col justify-center">
                              Antall påmeldte: {event.registrationList.length}/
                              {event.maxRegistrations}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        <div className="flex gap-3 mb-32">
          {new Array(Math.min(data?.pages || 0, 5)).fill(0).map((_, i) => (
            <button
              onClick={() => setPage(i + 1)}
              className={`bg-white rounded-xl hover:brightness-95 transition-all w-12 h-12 ${
                page === i + 1 ? ' border-primary border-2' : ''
              }`}
              key={`navigation-${i}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
