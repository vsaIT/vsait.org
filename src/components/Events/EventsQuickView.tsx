import EventCard, { EventCardSkeleton } from './EventCard';
import { CalendarCheck } from '@/components/icons';
import { useEvents } from '@/lib/hooks/useEvent';
import { ExtendedComponentProps } from '@/types/types';
import Link from 'next/link';

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

const EventsQuickView = ({ className = '' }: ExtendedComponentProps) => {
  const { data, isLoading, isError } = useEvents('page=1&upcoming=true');

  if (isError) throw new Error('Failed to load events');

  const events = data?.events ?? [];
  // A lone event gets the wide card across the full width
  const isSingle = events.length === 1;

  return (
    <div className={`w-full ${className}`}>
      <div className='flex flex-col gap-5 text-left sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <p className='flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-primary'>
            <span className='h-0.5 w-6 rounded-full bg-primary' />
            Hva skjer
          </p>
          <h2 className='mt-3 text-3xl  sm:text-4xl'>
            Kommende arrangementer
          </h2>
          <p className='mt-2 text-sm text-gray'>
            Bli med på lek, mat og kultur sammen med andre studenter i
            Trondheim.
          </p>
        </div>

        <Link
          href='/events'
          className='w-full shrink-0 rounded-full bg-white px-6 py-3 text-center text-sm text-primary shadow-sm transition-all duration-300 hover:brightness-95 sm:w-fit'
        >
          Se alle arrangementer →
        </Link>
      </div>

      <div className='mt-10'>
        {isLoading ? (
          <div className='flex flex-col gap-6'>
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
        ) : events.length ? (
          <div
            className={
              isSingle
                ? 'flex flex-col gap-6'
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
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};
export default EventsQuickView;
