'use client';
import { useEventArchive } from '@/lib/hooks/useEvent';
import { Calendar, Place } from '@/components/icons';
import Image from 'next/image';

// Showcase grid of events that have already happened. Display only —
// these are not bookable and have no detail page.
const PastEvents = () => {
  const { data, isLoading } = useEventArchive();

  // Hide the whole section while loading or when there is nothing to show.
  if (isLoading || !data?.events || data.events.length === 0) return null;

  return (
    <section className='relative z-10 mb-32 flex w-11/12 max-w-screen-xl flex-col gap-6'>
      <div className='text-left'>
        <h2 className='text-2xl font-bold md:text-3xl'>
          Tidligere arrangementer
        </h2>
        <p className='text-sm text-gray-600 md:text-base'>
          Et utvalg av arrangementer vi har holdt tidligere.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {data.events.map((event) => (
          <div
            key={event.id}
            className='group flex flex-col overflow-hidden rounded-2xl border-2 border-primary bg-white shadow-lg'
          >
            <div className='h-44 w-full overflow-hidden opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0'>
              <Image
                src={event.image || '/placeholder.png'}
                alt={event.title}
                width={1352}
                height={564}
                sizes='100vw'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className='flex flex-col gap-2 p-4 text-left'>
              <h3 className='text-lg font-bold'>{event.title}</h3>
              <div className='grid grid-cols-event gap-3'>
                <Calendar className='justify-self-center' />
                <p className='flex flex-col justify-center text-sm'>
                  {new Date(event.startTime).toDateString()}
                </p>
              </div>
              {event.location && (
                <div className='grid grid-cols-event gap-3'>
                  <Place className='justify-self-center' />
                  <p className='flex flex-col justify-center text-sm'>
                    {event.location}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PastEvents;
