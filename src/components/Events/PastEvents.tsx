'use client';
import {
  Calendar,
  CaretLeft,
  CaretRight,
  Person,
  Place,
} from '@/components/icons';
import { useEventArchive } from '@/lib/hooks/useEvent';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Events that have already happened, shown below the upcoming events on the main events page.
const PastEvents = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Keep the current archive page in the URL (?pastPage=).
  const page = Math.max(1, Number(searchParams.get('pastPage')) || 1);
  const { data, isLoading } = useEventArchive(`page=${page}`);

  const goToPage = (next: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pastPage', String(next));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (isLoading && !data) {
    return <p className='my-10 text-center'>Laster inn...</p>;
  }

  if (!data?.events || data.events.length === 0) {
    return (
      <p className='text-gray-600 my-10 text-center'>
        Ingen tidligere arrangementer å vise enda.
      </p>
    );
  }

  const totalPages = data.pages || 1;
  const currentPage = data.page || page;

  // Windowed page numbers
  const windowSize = Math.min(5, totalPages);
  const windowEnd = Math.min(
    totalPages,
    Math.max(currentPage + Math.floor(windowSize / 2), windowSize)
  );
  const windowStart = windowEnd - windowSize + 1;
  const pageNumbers = Array.from(
    { length: windowSize },
    (_, i) => windowStart + i
  );

  return (
    <div className='flex flex-col gap-6'>
      {data.events.map((event) => (
        <Link href={`/events/past/${event.id}`} key={event.id}>
          <div className='group rounded-2xl border-2 border-primary p-3'>
            <div className='relative mx-auto flex w-full flex-col gap-3 rounded-2xl bg-white p-3 shadow-lg md:grid md:grid-cols-layout'>
              <div className='h-48 w-full overflow-hidden rounded-2xl opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-[170px] md:rounded-l-2xl'>
                <Image
                  src={event.image || '/placeholder.png'}
                  alt='event image'
                  width={1352}
                  height={564}
                  sizes='100vw'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className='hidden h-full w-full rounded-lg bg-primary md:block'></div>
              <div className='text-gray-500 flex w-full flex-col text-left transition-all duration-300 group-hover:text-black'>
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
                      Antall påmeldte: {event.registrations}
                      {event.maxRegistrations > 0
                        ? `/${event.maxRegistrations}`
                        : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {totalPages > 1 && (
        <div className='mt-2 flex items-center justify-center gap-3'>
          <button
            type='button'
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            aria-label='Første side'
            className='flex h-12 w-12 items-center justify-center rounded-xl bg-white transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40'
          >
            <CaretLeft />
            <CaretLeft className='-ml-2.5' />
          </button>

          <button
            type='button'
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label='Forrige side'
            className='flex h-12 w-12 items-center justify-center rounded-xl bg-white transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40'
          >
            <CaretLeft />
          </button>

          {pageNumbers.map((number) => (
            <button
              type='button'
              key={`past-navigation-${number}`}
              onClick={() => goToPage(number)}
              className={`flex h-12 w-12 flex-col justify-center rounded-xl bg-white text-center transition-all hover:brightness-95 ${
                currentPage === number ? ' border-2 border-primary' : ''
              }`}
            >
              {number}
            </button>
          ))}

          <button
            type='button'
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label='Neste side'
            className='flex h-12 w-12 items-center justify-center rounded-xl bg-white transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40'
          >
            <CaretRight />
          </button>

          <button
            type='button'
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            aria-label='Siste side'
            className='flex h-12 w-12 items-center justify-center rounded-xl bg-white transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40'
          >
            <CaretRight />
            <CaretRight className='-ml-2.5' />
          </button>
        </div>
      )}
    </div>
  );
};

export default PastEvents;
