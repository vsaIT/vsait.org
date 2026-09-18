'use client';
import { EventsDetailedSkeleton } from '@/components/Events';
import { CurvyHeader } from '@/components/Header';
import { CalendarOutline, MapPin, Person, Users } from '@/components/icons';
import { useEventArchiveItem } from '@/lib/hooks/useEvent';
import { getLocaleDateString, getLocaleTimeString } from '@/lib/utils';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import Link from 'next/link';

// Read-only detail page for an archived (past) event.
function PastEventDetail({ params }: { params: { id: string } }): JSX.Element {
  const { id } = params;
  const { data, isLoading, isError } = useEventArchiveItem(id);

  if (isError) window.location.href = '/500';

  const event = data?.event;

  if (isLoading || !event) return <EventsDetailedSkeleton />;

  return (
    <>
      <CurvyHeader waveColor='#FDF8F0' height='sm:h-[28rem]'>
        <div className='relative z-20 mx-auto w-11/12 max-w-[58rem] text-left'>
          <Link
            href='/events?tab=past'
            className='text-sm text-white/85 transition-all duration-300 hover:text-white'
          >
            ← Tilbake til arrangementer
          </Link>

          <h1 className='mt-6 max-w-3xl text-4xl leading-snug text-white sm:text-5xl'>
            {event.title}
          </h1>

          <div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white'>
            <span className='flex items-center gap-2'>
              <CalendarOutline color='#FFFFFF' className='h-4 w-4 shrink-0' />
              {getLocaleDateString(new Date(event.startTime))},{' '}
              {getLocaleTimeString(new Date(event.startTime))}–
              {getLocaleTimeString(new Date(event.endTime))}
            </span>
            <span className='flex items-center gap-2'>
              <MapPin color='#FFFFFF' className='h-4 w-4 shrink-0' />
              {event.location}
            </span>
          </div>
        </div>
      </CurvyHeader>

      <section className='w-full bg-cream pb-20'>
        <div className='relative mx-auto mt-12 w-11/12 max-w-[58rem] overflow-hidden rounded-3xl shadow-sm'>
          <Image
            src={event.image || '/placeholder.png'}
            alt={event.title}
            width={1352}
            height={564}
            sizes='(max-width: 1215px) 95vw, 1115px'
            priority
            className='h-auto w-full object-cover'
          />
        </div>

        <div className='mx-auto grid w-11/12 max-w-[58rem] grid-cols-1 gap-8 py-8 text-left lg:grid-cols-[1.6fr_1fr]'>
          <div className='min-w-0 rounded-3xl bg-white p-6 shadow-sm sm:p-8'>
            <h2 className='text-xl '>Om arrangementet</h2>
            <p className='mt-1 text-sm text-white'>
              Dette arrangementet er avsluttet.
            </p>
            <div
              className='mt-4 break-words text-sm leading-relaxed [&_a]:text-primary [&_a]:underline'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(event.description),
              }}
            />
          </div>

          <aside className='flex flex-col gap-6'>
            <div className='rounded-3xl bg-white p-6 shadow-sm'>
              <h2 className='text-lg '>Detaljer</h2>
              <dl className='mt-4 flex flex-col'>
                <div className='flex items-start gap-3 border-b border-primary/10 pb-4'>
                  <CalendarOutline
                    color='#D5564D'
                    className='mt-0.5 h-4 w-4 shrink-0'
                  />
                  <div>
                    <dt className='text-sm '>
                      {getLocaleDateString(new Date(event.startTime))}
                    </dt>
                    <dd className='text-xs text-gray'>
                      {getLocaleTimeString(new Date(event.startTime))}–
                      {getLocaleTimeString(new Date(event.endTime))}
                    </dd>
                  </div>
                </div>

                <div className='flex items-start gap-3 border-b border-primary/10 py-4'>
                  <MapPin color='#D5564D' className='mt-0.5 h-4 w-4 shrink-0' />
                  <div>
                    <dt className='text-sm '>{event.location}</dt>
                    <dd className='text-xs text-gray'>Sted</dd>
                  </div>
                </div>

                <div className='flex items-start gap-3 border-b border-primary/10 py-4'>
                  <Person color='#D5564D' className='mt-0.5 h-4 w-4 shrink-0' />
                  <div>
                    <dt className='text-sm '>
                      {event.eventType === 'OPEN' ? 'Alle' : 'Medlemmer'}
                    </dt>
                    <dd className='text-xs text-gray'>Åpent for</dd>
                  </div>
                </div>

                <div className='flex items-start gap-3 pt-4'>
                  <Users color='#D5564D' className='mt-0.5 h-4 w-4 shrink-0' />
                  <div>
                    <dt className='text-sm '>
                      {event.registrations}
                      {event.maxRegistrations > 0
                        ? ` / ${event.maxRegistrations}`
                        : ''}
                    </dt>
                    <dd className='text-xs text-gray'>Antall påmeldte</dd>
                  </div>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default PastEventDetail;
