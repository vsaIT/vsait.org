'use client';
import { CancelledBadge, EventsDisplaySkeleton } from '@/components/Events';
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
                    <div className='relative mx-auto flex w-full flex-col gap-3 rounded-2xl bg-white p-3 shadow-lg md:grid md:grid-cols-layout'>
                      {isCancelled && (
                        <div className='absolute -left-6 -top-4 z-20 transition-transform group-hover:scale-110'>
                          <CancelledBadge size='sm' />
                        </div>
                      )}
                      <div
                        className={`h-48 w-full overflow-hidden rounded-2xl transition-all duration-300 md:h-[170px] md:rounded-l-2xl ${
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
                      <div className='hidden h-full w-full rounded-lg bg-primary md:block'></div>
                      <div
                        className={`flex w-full flex-col text-left transition-all duration-300 ${
                          isGreyedOut
                            ? 'text-gray-500 group-hover:text-black'
                            : ''
                        }`}
                      >
                        <h2 className='mb-3 text-xl font-bold md:text-2xl'>
                          {event.title}
                        </h2>
                        <div className='flex flex-col gap-2'>
                          <div className='grid grid-cols-event gap-3'>
                            <Calendar className='justify-self-center' />
                            <p className='flex flex-col justify-center text-sm md:text-base'>
                              {new Date(event.startTime).toDateString()} -{' '}
                              {new Date(event.endTime).toDateString()}
                            </p>
                          </div>
                          <div className='grid grid-cols-event gap-3'>
                            <Place className='justify-self-center' />
                            <p className='flex flex-col justify-center text-sm md:text-base'>
                              {event.location}
                            </p>
                          </div>
                          <div className='grid grid-cols-event gap-3'>
                            <Person className='justify-self-center' />
                            <p className='flex flex-col justify-center text-sm md:text-base'>
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
