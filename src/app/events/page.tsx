'use client';
import { EventsDisplaySkeleton } from '@/components/Events';
import { CurvyHeader } from '@/components/Header';
import { Calendar, Person, Place } from '@/components/icons';
import { EventType } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const fetchProjects = async (page = 0) => {
  const data = await fetch(`/api/events?page=${page}`).then((res) =>
    res.json()
  );
  return data;
};

function Events(): JSX.Element {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 1);

  const { isLoading, error, isFetching, data } = useQuery({
    queryKey: ['events', page],
    queryFn: () => fetchProjects(page),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });

  useEffect(() => {
    if (data?.page < data?.pages) {
      queryClient.prefetchQuery({
        queryKey: ['projects', page + 1],
        queryFn: () => fetchProjects(page + 1),
      });
    }
  }, [data, page, queryClient]);

  if (error) return <p>{'An error has occurred: ' + error}</p>;

  return (
    <>
      <CurvyHeader title='Arrangementer' />

      <div className='events relative z-10 mb-8 flex w-11/12 max-w-screen-xl flex-col gap-6'>
        {isLoading || isFetching || !data?.events
          ? new Array(3).fill(0).map((_, index: number) => (
              <>
                <EventsDisplaySkeleton key={index} />
              </>
            ))
          : data?.events?.map((event: EventType, index: number) => (
              <>
                <Link href={`/events/${event.id}`} key={index}>
                  <div className='rounded-2xl border-2 border-primary p-3'>
                    <div className='relative mx-auto grid w-full grid-cols-layout gap-3 rounded-2xl bg-white p-3 shadow-lg'>
                      <div className='flex w-full'>
                        <div className='w-full overflow-hidden rounded-l-2xl'>
                          <Image
                            src={event.image as string}
                            alt='event image'
                            width={1352}
                            height={564}
                            sizes='100vw'
                            style={{
                              width: '100%',
                              height: 'auto',
                            }}
                          />
                        </div>
                      </div>
                      <div className='h-full w-full rounded-lg bg-primary'></div>
                      <div className='flex w-full flex-col text-left'>
                        <h2 className='mb-3 text-2xl font-bold'>
                          {event.title}
                        </h2>
                        <div className='flex flex-col gap-3'>
                          <div className='grid grid-cols-event gap-3'>
                            <Calendar className='justify-self-center' />
                            <p className='flex flex-col justify-center'>
                              {new Date(event.startTime).toDateString()} -{' '}
                              {new Date(event.endTime).toDateString()}
                            </p>
                          </div>

                          <div className='grid grid-cols-event gap-3'>
                            <Place className='justify-self-center' />
                            <p className='flex flex-col justify-center'>
                              {event.location}
                            </p>
                          </div>
                          <div className='grid grid-cols-event gap-3'>
                            <Person className='justify-self-center' />
                            <p className='flex flex-col justify-center'>
                              Antall påmeldte: {event.registrationList.length}/
                              {event.maxRegistrations}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
      </div>

      <div className='mb-32 flex gap-3'>
        {new Array(Math.min(data?.pages || 0, 5)).fill(0).map((_, i) => (
          <Link
            href={`/events?page=${i + 1}`}
            key={`navigation-${i}`}
            className={`flex h-12 w-12 flex-col justify-center rounded-xl bg-white transition-all hover:brightness-95 ${
              page === i + 1 ? ' border-2 border-primary' : ''
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Events;
