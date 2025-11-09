'use client';
import { EventsDetailedSkeleton } from '@/components/Events';
import { SmallHeader } from '@/components/Header';
import { Button } from '@/components/Input';
import StyledSwal from '@/components/StyledSwal';
import { useEvent } from '@/lib/hooks/useEvent';
import { getErrorMessage } from '@/lib/utils';
import { ApiResponseType, RegisteredUserType } from '@/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
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
        await fetch(`/api/events/register?eventid=${eventid}&userid=${session.user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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

  const showRegistrations = useCallback(() => {
    if ((data?.registrations ?? []).length > 0) {
      StyledSwal.fire({
        title: <p>Liste over påmeldte</p>,
        html: (
          <div className='flex flex-col'>
            {(data?.registrations ?? []).length > 0 ? (
              data?.registrations.map((user: RegisteredUserType, i: number) => (
                <p
                  key={user.name + i}
                  className='border-t-2 border-slate-100 px-2'
                >
                  {user.name}
                </p>
              ))
            ) : (
              <p className='px-2'>Ingen påmeldte...</p>
            )}
          </div>
        ),
        showConfirmButton: false,
        showCloseButton: true,
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
          <div className='flex w-full rounded-2xl bg-white p-6 shadow-2xl'>
            <div className='w-full overflow-hidden'>
              <Image
                src={data.event.image as string}
                alt='Vercel Logo'
                width={1352}
                height={564}
                sizes='100vw'
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>

          <div className='grid grid-cols-eventdetail gap-6 text-left'>
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
                <p>
                  <b>Påmeldingsfrist:</b>{' '}
                  {new Date(data.event.registrationDeadline).toDateString()}
                </p>
                <p>
                  <b>Avmeldingsfrist:</b>{' '}
                  {new Date(data.event.cancellationDeadline).toDateString()}
                </p>
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
              <p>{data.event.description}</p>
            </div>
          </div>

          <div className='grid grid-cols-eventdetail gap-6 text-left'>
            <div className='flex flex-col'>
              <div className='mb-6 flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
                <h2 className='mb-4 text-2xl font-bold'>Påmelding</h2>
                <div className='flex flex-col gap-2'>
                  <p>
                    <b>Antall påmeldte:</b>{' '}
                    {data.event.registrationList?.length} /{' '}
                    {data.event.maxRegistrations}
                  </p>
                  <p>
                    <b>Venteliste:</b> {data.event.waitingList?.length}
                  </p>
                  <div className='mt-2 flex flex-col gap-3'>
                    {session?.user ? (
                      <>
                        <Button
                          onClick={() => showRegistrations()}
                          text='Se andre påmeldte'
                        />
                        {new Date() >=
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
                        ) : (data.event.eventType === 'MEMBERSHIP') ||
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
