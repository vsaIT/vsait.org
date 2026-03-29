'use client';
import { EventsDisplaySkeleton } from '@/components/Events';
import { CurvyHeader } from '@/components/Header';
import { Calendar, Person, Place } from '@/components/icons';
import { useEvents } from '@/lib/hooks/useEvent';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function Events(): JSX.Element {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 1);

  const { data, isLoading, isError } = useEvents(`page=${page}`);

  if (isError) window.location.href = '/500';

  return (
    <>
      <CurvyHeader title='Arrangementer' />

      <div className='events relative z-10 mb-8 flex w-11/12 max-w-screen-xl flex-col gap-6'>
        {isLoading || !data?.events
          ? new Array(3)
              .fill(0)
              .map((_, index: number) => <EventsDisplaySkeleton key={index} />)
          : data?.events?.map((event) => {
              const isPast = new Date(event.endTime) < new Date();
              const isCancelled = event.isCancelled;
              const isGreyedOut = isPast || isCancelled;
              return (
                <Link href={`/events/${event.id}`} key={event.id}>
                  <div className='group rounded-2xl border-2 border-primary p-3'>
                    <div className='relative mx-auto grid w-full grid-cols-layout gap-3 rounded-2xl bg-white p-3 shadow-lg'>
                      {isCancelled && (
                        <div className='absolute -left-6 -top-4 z-20 -rotate-12 rounded-lg border-4 border-white bg-red-700 px-4 py-2 text-2xl font-bold text-white shadow-xl transition-transform group-hover:scale-110'>
                          AVLYST
                        </div>
                      )}
                      <div className='flex w-full'>
                        <div
                          className={`h-[170px] w-full overflow-hidden rounded-l-2xl transition-all duration-300 ${
                            isGreyedOut
                              ? 'opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0'
                              : ''
                          }`}
                        >
                          <Image
                            src={(event.image as string) || '/placeholder.png'}
                            alt='event image'
                            width={1352}
                            height={564}
                            sizes='100vw'
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      </div>
                      <div className='h-full w-full rounded-lg bg-primary'></div>
                      <div
                        className={`flex w-full flex-col text-left transition-all duration-300 ${
                          isGreyedOut
                            ? 'text-gray-500 group-hover:text-black'
                            : ''
                        }`}
                      >
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
                              Antall påmeldte: {event._count?.registrationList}/
                              {event.maxRegistrations}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
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
