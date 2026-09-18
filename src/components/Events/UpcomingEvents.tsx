'use client';
import EventCard, { EventCardSkeleton } from './EventCard';
import EventsPagination from './EventsPagination';
import { CalendarCheck } from '@/components/icons';
import { useEvents } from '@/lib/hooks/useEvent';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const EmptyState = () => (
  <div className='flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-primary/20 bg-primary/[0.06] px-6 py-16 text-center'>
    <div className='flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm'>
      <CalendarCheck color='#D5564D' className='h-7 w-7' />
    </div>
    <h3 className='mt-6 '>Ingen kommende arrangementer akkurat nå</h3>
    <p className='mt-2 max-w-xs text-sm leading-relaxed text-gray'>
      Vi legger fortløpende ut nye datoer. Følg oss på Instagram eller Discord
      så du ikke går glipp av neste samling.
    </p>
  </div>
);

// The events that have not happened yet
const UpcomingEvents = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Keep the current page in the URL
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const { data, isLoading, isError } = useEvents(`page=${page}&upcoming=true`);

  if (isError) throw new Error('Failed to load events');

  const goToPage = (next: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(next));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const events = data?.events ?? [];

  if (isLoading && !data) {
    return (
      <div className='w-full'>
        <EventCardSkeleton />
      </div>
    );
  }

  if (!events.length) return <EmptyState />;

  // A lone event gets the wide card across the full width
  const isSingle = events.length === 1;

  return (
    <>
      <div
        className={
          isSingle
            ? 'flex w-full flex-col gap-6'
            : 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
        }
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            href={`/events/${event.id}`}
            title={event.title}
            image={event.image as string}
            startTime={event.startTime}
            location={event.location}
            registrations={event._count?.registrationList ?? 0}
            seed={String(event.id)}
            isPast={new Date(event.endTime) < new Date()}
            isCancelled={event.isCancelled}
            compact={!isSingle}
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
export default UpcomingEvents;
