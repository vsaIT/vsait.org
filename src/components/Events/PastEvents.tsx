'use client';
import EventCard, { EventCardSkeleton } from './EventCard';
import EventsPagination from './EventsPagination';
import { CalendarCheck } from '@/components/icons';
import { usePastEvents } from '@/lib/hooks/useEvent';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const EmptyState = () => (
  <div className='flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-primary/20 bg-primary/[0.06] px-6 py-16 text-center'>
    <div className='flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm'>
      <CalendarCheck color='#D5564D' className='h-7 w-7' />
    </div>
    <h3 className='mt-6 '>
      Ingen tidligere arrangementer å vise enda
    </h3>
    <p className='mt-2 max-w-xs text-sm leading-relaxed text-gray'>
      Arrangementene vi har hatt dukker opp her så snart de er ferdige.
    </p>
  </div>
);

// Events that have already happened
const PastEvents = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Keep the current page in the URL
  const page = Math.max(1, Number(searchParams.get('pastPage')) || 1);
  const { data, isLoading } = usePastEvents(`page=${page}`);

  const goToPage = (next: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pastPage', String(next));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (isLoading && !data) {
    return (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <EventCardSkeleton compact />
        <EventCardSkeleton compact />
        <EventCardSkeleton compact />
      </div>
    );
  }

  const events = data?.events ?? [];
  if (!events.length) return <EmptyState />;

  return (
    <>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {events.map((event) => (
          <EventCard
            // Archive ids and Event ids are only unique within their own table
            key={`${event.source}-${event.id}`}
            href={
              event.source === 'archive'
                ? `/events/past/${event.id}`
                : `/events/${event.id}`
            }
            title={event.title}
            image={event.image}
            startTime={event.startTime}
            location={event.location}
            registrations={event.registrations}
            seed={`past-${event.source}-${event.id}`}
            isPast
            isCancelled={event.isCancelled}
            compact
          />
        ))}
      </div>

      <EventsPagination
        page={data?.page ?? page}
        pages={data?.pages ?? 1}
        onChange={goToPage}
      />
    </>
  );
};

export default PastEvents;
