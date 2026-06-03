'use client';
import { CancelledBadge, EventsDetailedSkeleton } from '@/components/Events';
import { SmallHeader } from '@/components/Header';
import { Button } from '@/components/Input';
import StyledSwal from '@/components/StyledSwal';
import { useEvent } from '@/lib/hooks/useEvent';
import { getErrorMessage } from '@/lib/utils';
import { ApiResponseType, RegisteredUserType } from '@/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';
import AdminRegistrationsList from './(components)/AdminRegistrationsList';
import InfoBox from './(components)/InfoBox';

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
  const showRegistrations = useCallback(() => {
    if ((data?.registrations ?? []).length > 0) {
      StyledSwal.fire({
        title: (
          <h2 className='mb-2 border-b pb-4 text-2xl font-bold'>Påmeldte</h2>
        ),
        html: (
          <div className='custom-scrollbar flex max-h-[60vh] flex-col overflow-y-auto px-1 py-2'>
            <div className='flex flex-col gap-3 text-left'>
              {(data?.registrations ?? []).length > 0 ? (
                data?.registrations.map(
                  (user: RegisteredUserType, i: number) => (
                    <div
                      key={user.name + i}
                      className='flex items-center rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition hover:bg-slate-100'
                    >
                      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-sm'>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <p className='ml-4 text-base font-medium'>{user.name}</p>
                    </div>
                  )
                )
              ) : (
                <p className='py-4 text-center text-slate-500'>
                  Ingen påmeldte...
                </p>
              )}
            </div>
          </div>
        ),
        showConfirmButton: false,
        showCloseButton: true,
        width: '450px',
      });
    }
  }, [data]);

  return (
    <>
      <SmallHeader />
      {status === 'loading' || isLoading || !data ? (
        <>
          <EventsDetailedSkeleton />
        </>
      ) : (
        <div className='z-10 mb-32 flex w-11/12 max-w-screen-xl -translate-y-10 transform flex-col gap-6'>
          <div className='relative flex w-full rounded-2xl bg-white p-6 shadow-2xl'>
            <div
              className={`w-full overflow-hidden ${data.event.isCancelled ? 'opacity-60 grayscale' : ''}`}
            >
              {data.event.isCancelled && (
                <div className='pointer-events-none absolute inset-0 z-20 flex items-center justify-center'>
                  <CancelledBadge size='lg' />
                </div>
              )}
              <Image
                src={(data.event.image as string) || '/placeholder.png'}
                alt={data.event.title}
                width={1352}
                height={564}
                sizes='100vw'
                priority
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          <div className='flex flex-col gap-6 text-left md:grid md:grid-cols-eventdetail'>
            <div className='flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
              <h2 className='mb-4 text-2xl font-bold'>Detaljer</h2>

              <div className='flex flex-col gap-2'>
                <p>
                  <b>Starttid:</b>{' '}
                  {new Date(data.event.startTime).toDateString()}
                </p>
                <p>
                  <b>Sluttid:</b> {new Date(data.event.endTime).toDateString()}
                </p>
                {!isPast && (
                  <>
                    <p>
                      <b>Påmeldingsfrist:</b>{' '}
                      {new Date(data.event.registrationDeadline).toDateString()}
                    </p>
                    <p>
                      <b>Avmeldingsfrist:</b>{' '}
                      {new Date(data.event.cancellationDeadline).toDateString()}
                    </p>
                  </>
                )}
                <p>
                  <b>Sted:</b> {data.event.location}
                </p>
                <p>
                  <b>Åpent for:</b>{' '}
                  {data.event.eventType === 'OPEN' ? 'Alle' : 'Medlemmer'}
                </p>
              </div>
            </div>
            <div className='flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
              <h2 className='mb-4 text-2xl font-bold'>{data.event.title}</h2>
              <p className='mb-2 italic'>
                Last edited: {new Date().toDateString()}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.event.description),
                }}
              />
            </div>
          </div>

          <div className='flex flex-col gap-6 text-left md:grid md:grid-cols-eventdetail'>
            <div className='flex flex-col'>
              <div className='mb-6 flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
                <h2 className='mb-4 text-2xl font-bold'>Påmelding</h2>
                <div className='flex flex-col gap-2'>
                  <p>
                    <b>Antall påmeldte:</b>{' '}
                    {data.event._count?.registrationList ??
                      data.registrations.length}{' '}
                    / {data.event.maxRegistrations}
                  </p>
                  <p>
                    <b>Venteliste:</b> {data.event._count?.waitingList}
                  </p>
                  <div className='mt-2 flex flex-col gap-3'>
                    {session?.user?.role === 'ADMIN' && (
                      <Button
                        onClick={() => showRegistrations()}
                        text='Se andre påmeldte'
                      />
                    )}
                    {isPast ? (
                      <p className='text-center'>
                        Dette arrangementet er avsluttet.
                      </p>
                    ) : session?.user ? (
                      <>
                        {data.event.isCancelled ? (
                          <p className='text-center font-bold text-red-500'>
                            Arrangementet er avlyst!
                          </p>
                        ) : new Date() >=
                          new Date(data.event.registrationDeadline) ? (
                          <p className='text-center'>
                            Arrangementet er ikke åpent for påmelding!
                          </p>
                        ) : new Date() >=
                            new Date(data.event.cancellationDeadline) &&
                          data.hasRegistered ? (
                          <p className='text-center'>
                            Arrangementet er ikke lenger åpent for avmelding!
                          </p>
                        ) : (data.hasMembership &&
                            data.event.eventType === 'MEMBERSHIP') ||
                          data.event.eventType === 'OPEN' ? (
                          data.hasRegistered ? (
                            <>
                              <Button
                                onClick={() =>
                                  registrationEnabled && register()
                                }
                                text='Meld deg av'
                              />
                            </>
                          ) : (
                            <>
                              <Button
                                onClick={() =>
                                  registrationEnabled && register()
                                }
                                text='Meld deg på'
                              />
                            </>
                          )
                        ) : (
                          <div className='flex flex-col gap-1'>
                            <p>
                              Dette arrangementet er kun åpen for medlemmer.
                            </p>
                            <p>
                              Vennligst søk om medlemsskap ved å gå inn på{' '}
                              <Link
                                href='/profile'
                                className='font-medium text-primary hover:underline'
                              >
                                profil
                              </Link>
                              .
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className='text-center'>
                        Du må være pålogget for å melde deg på arrangementet!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {session?.user.role === 'ADMIN' && (
                <div className='flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
                  <h2 className='mb-4 text-2xl font-bold'>Innslipp</h2>
                  <a
                    className='block w-full'
                    href={`/events/checkin/${eventid}`}
                  >
                    <Button text='Gå til innslipp' className='w-full' />
                  </a>
                </div>
              )}
            </div>
            <InfoBox />
          </div>

          {session?.user.role === 'ADMIN' && (
            <AdminRegistrationsList registrations={data?.registrations ?? []} />
          )}
        </div>
      )}
    </>
  );
}

export default Event;
