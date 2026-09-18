'use client';
import {
  AvatarStack,
  CancelledBadge,
  EventsDetailedSkeleton,
} from '@/components/Events';
import { CurvyHeader } from '@/components/Header';
import {
  CalendarCheck,
  CalendarOutline,
  MapPin,
  Person,
  Users,
} from '@/components/icons';
import StyledSwal from '@/components/StyledSwal';
import { useEvent } from '@/lib/hooks/useEvent';
import { getErrorMessage, getLocaleDateString } from '@/lib/utils';
import { ApiResponseType } from '@/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';
import AdminRegistrationsList from './(components)/AdminRegistrationsList';
import InfoBox from './(components)/InfoBox';

const formatTime = (date: Date | string) => {
  const value = new Date(date);
  return `${String(value.getHours()).padStart(2, '0')}:${String(
    value.getMinutes()
  ).padStart(2, '0')}`;
};

const cardClass =
  'rounded-3xl bg-white p-6 shadow-sm sm:p-8';

function Event({ params }: { params: { eventid: string } }): JSX.Element {
  const { status, data: session } = useSession({
    required: false,
  });
  const { eventid } = params;
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const { data, isLoading, isError } = useEvent(eventid);

  if (isError) window.location.href = '/500';

  // Once an event has ended we show it as a finished event.
  const isPast = data ? new Date(data.event.endTime) < new Date() : false;
  const isAdmin = session?.user.role === 'ADMIN';

  // Registration is closed if the event is in the past, or if the registration deadline has passed.
  const register = useCallback(async () => {
    if (!eventid || !session?.user?.id) return;
    const melding = data?.hasRegistered ? 'av' : 'på';
    StyledSwal.fire({
      icon: 'info',
      title: <p>Bekreftelse!</p>,
      text: `Du melder deg nå ${melding} arrangementet`,
      showCancelButton: true,
      confirmButtonText: `Ok, meld meg ${melding}`,
      cancelButtonText: 'Avbryt',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        // Disable registration spamming
        setRegistrationEnabled(false);
        // Hide cancel button when loading
        const cancelButton = StyledSwal.getCancelButton();
        if (cancelButton) cancelButton.style.opacity = '0';
        // Send registration request
        await fetch('/api/events/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session?.user?.id,
            eventId: eventid,
          }),
        })
          .then(async (response) => {
            if (!response.ok) throw new Error(response.statusText);
            const data: ApiResponseType = await response.json();
            return data;
          })
          .then(async (data) => {
            console.log('Success:', data);
            await StyledSwal.fire({
              icon: 'success',
              title: <p>Registrert!</p>,
              text: `Du er nå meldt ${melding} arrangementet`,
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
          })
          .catch((error: unknown) => {
            return StyledSwal.fire({
              icon: 'error',
              title: <p>Ikke registrert!</p>,
              html: (
                <>
                  <p>
                    {data?.hasRegistered ? 'Avmelding' : 'Påmelding'} på
                    arrangementet mislykket
                  </p>
                  <code className='mt-2 w-full'>{getErrorMessage(error)}</code>
                </>
              ),
              showConfirmButton: false,
              timer: 5000,
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).finally(() => setRegistrationEnabled(true));
  }, [eventid, session, data]);

  // Only show the registration button if the event is not in the past, the user is logged in
  // and the registration deadline has not passed.

  if (status === 'loading' || isLoading || !data) {
    return <EventsDetailedSkeleton />;
  }

  const { event } = data;
  const registrations = event._count?.registrationList ?? 0;
  const waitingList = event._count?.waitingList ?? 0;
  const registeredNames = data.registrations.map(({ name }) => name);

  const registrationAction = () => {
    if (isPast)
      return (
        <p className='text-sm text-white'>
          Dette arrangementet er avsluttet.
        </p>
      );
    if (!session?.user)
      return (
        <p className='text-sm text-white'>
          Du må være pålogget for å melde deg på arrangementet!
        </p>
      );
    if (event.isCancelled)
      return <p className='text-sm text-white'>Arrangementet er avlyst!</p>;
    if (new Date() >= new Date(event.registrationDeadline))
      return (
        <p className='text-sm text-white'>
          Arrangementet er ikke åpent for påmelding!
        </p>
      );
    if (
      new Date() >= new Date(event.cancellationDeadline) &&
      data.hasRegistered
    )
      return (
        <p className='text-sm text-white'>
          Arrangementet er ikke lenger åpent for avmelding!
        </p>
      );
    if (
      (data.hasMembership && event.eventType === 'MEMBERSHIP') ||
      event.eventType === 'OPEN'
    )
      return (
        <button
          type='button'
          onClick={() => registrationEnabled && register()}
          disabled={!registrationEnabled}
          className='w-full rounded-full bg-white py-3 text-sm text-primary shadow-md transition-all duration-300 hover:brightness-95 disabled:brightness-95'
        >
          {data.hasRegistered ? 'Meld deg av' : 'Meld deg på  →'}
        </button>
      );
    return (
      <p className='text-sm leading-relaxed text-white'>
        Dette arrangementet er kun åpent for medlemmer. Vennligst søk om
        medlemskap ved å gå inn på{' '}
        <Link href='/profile' className='underline'>
          profil
        </Link>
        .
      </p>
    );
  };

  return (
    <>
      <CurvyHeader waveColor='#FDF8F0' height='sm:h-[28rem]'>
        <div className='relative z-20 mx-auto w-11/12 max-w-[58rem] text-left'>
          <div className='flex flex-wrap items-center gap-3'>
            <Link
              href='/events'
              className='text-sm text-white/75 transition-all duration-300 hover:text-white'
            >
              ← Tilbake til arrangementer
            </Link>
          </div>

          <h1 className='mt-6 max-w-3xl text-4xl leading-snug text-white sm:text-5xl'>
            {event.title}
          </h1>

          <div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white'>
            <span className='flex items-center gap-2'>
              <CalendarOutline color='#FFFFFF' className='h-4 w-4 shrink-0' />
              {getLocaleDateString(event.startTime)},{' '}
              {formatTime(event.startTime)}–{formatTime(event.endTime)}
            </span>
            <span className='flex items-center gap-2'>
              <MapPin color='#FFFFFF' className='h-4 w-4 shrink-0' />
              {event.location}
            </span>
          </div>
        </div>
      </CurvyHeader>

      <section className='w-full bg-cream pb-20'>
        <div className='relative mx-auto mt-6 w-11/12 max-w-[58rem] overflow-hidden rounded-3xl shadow-sm'>
          {event.isCancelled && (
            <div className='pointer-events-none absolute inset-0 z-20 flex items-center justify-center'>
              <CancelledBadge size='lg' />
            </div>
          )}
          <Image
            src={(event.image as string) || '/placeholder.png'}
            alt={event.title}
            width={1352}
            height={564}
            sizes='(max-width: 1215px) 90vw, 1115px'
            priority
            className={`h-auto w-full object-cover ${
              event.isCancelled ? 'opacity-60 grayscale' : ''
            }`}
          />
        </div>

        <div className='mx-auto grid w-11/12 max-w-[58rem] grid-cols-1 gap-8 py-8 text-left lg:grid-cols-[1.6fr_1fr]'>
          <div className='flex min-w-0 flex-col gap-8'>
            <div className={cardClass}>
              <h2 className='text-xl '>Om arrangementet</h2>
              <div
                className='mt-4 break-words text-sm leading-relaxed [&_a]:text-primary [&_a]:underline'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(event.description),
                }}
              />
            </div>

            {registrations > 0 && (
              <div className={cardClass}>
                <h2 className='text-xl '>
                  Påmeldte ({registrations})
                </h2>
                <div className='mt-4 flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center'>
                  <AvatarStack
                    count={registrations}
                    seed={String(event.id)}
                    max={5}
                  />
                  <div>
                    {registeredNames.length > 0 ? (
                      <>
                        <p className='text-sm '>
                          {registeredNames.slice(0, 3).join(', ')}
                          {registrations > registeredNames.slice(0, 3).length
                            ? ` + ${
                                registrations -
                                registeredNames.slice(0, 3).length
                              } andre`
                            : ''}
                        </p>
                        <p className='text-xs text-gray'>
                          {isPast ? 'var med på' : 'blir med på'} arrangementet
                        </p>
                      </>
                    ) : (
                      <p className='text-sm '>
                        {registrations} {registrations === 1 ? 'person' : 'personer'}{' '}
                        {isPast ? 'var med på' : 'blir med på'} arrangementet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {isAdmin && (
              <AdminRegistrationsList registrations={data.registrations} />
            )}
          </div>

          <aside className='flex flex-col gap-6'>
            <div className='rounded-3xl bg-primary p-6 text-center text-white shadow-sm'>
              <p className='text-2xl'>{registrations} påmeldte</p>
              <p className='mt-1 text-xs text-white'>
                {event.maxRegistrations > 0
                  ? `av ${event.maxRegistrations} plasser`
                  : 'Ingen plassbegrensning'}
                {' · '}
                {event.eventType === 'OPEN'
                  ? 'Åpent for alle'
                  : 'For medlemmer'}
              </p>
              {waitingList > 0 && (
                <p className='mt-1 text-xs text-white'>
                  {waitingList} på venteliste
                </p>
              )}
              <div className='mt-5'>{registrationAction()}</div>
            </div>

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
                      {getLocaleDateString(event.startTime)}
                    </dt>
                    <dd className='text-xs text-gray'>
                      {formatTime(event.startTime)}–{formatTime(event.endTime)}
                    </dd>
                  </div>
                </div>

                {!isPast && (
                  <div className='flex items-start gap-3 border-b border-primary/10 py-4'>
                    <CalendarCheck
                      color='#D5564D'
                      className='mt-0.5 h-4 w-4 shrink-0'
                    />
                    <div>
                      <dt className='text-sm '>
                        Påmeldingsfrist{' '}
                        {getLocaleDateString(event.registrationDeadline)}
                      </dt>
                      <dd className='text-xs text-gray'>
                        Avmeldingsfrist{' '}
                        {getLocaleDateString(event.cancellationDeadline)}
                      </dd>
                    </div>
                  </div>
                )}

                <div className='flex items-start gap-3 border-b border-primary/10 py-4'>
                  <MapPin color='#D5564D' className='mt-0.5 h-4 w-4 shrink-0' />
                  <div>
                    <dt className='text-sm '>{event.location}</dt>
                    <dd className='text-xs text-gray'>Sted</dd>
                  </div>
                </div>

                <div className='flex items-start gap-3 pt-4'>
                  <Person color='#D5564D' className='mt-0.5 h-4 w-4 shrink-0' />
                  <div>
                    <dt className='text-sm '>
                      {event.eventType === 'OPEN' ? 'Alle' : 'Medlemmer'}
                    </dt>
                    <dd className='text-xs text-gray'>Åpent for</dd>
                  </div>
                </div>
              </dl>
            </div>

            <InfoBox />

            {isAdmin && (
              <div className='rounded-3xl bg-white p-6 shadow-sm'>
                <h2 className='flex items-center gap-2 text-lg '>
                  <Users color='#D5564D' className='h-4 w-4' />
                  Innslipp
                </h2>
                <p className='mt-2 text-xs leading-relaxed text-gray'>
                  Registrer oppmøte på arrangementet.
                </p>
                <Link
                  href={`/events/checkin/${eventid}`}
                  className='mt-4 block rounded-full bg-primary py-3 text-center text-sm text-white shadow-md transition-all duration-300 hover:brightness-90'
                >
                  Gå til innslipp
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}

export default Event;
