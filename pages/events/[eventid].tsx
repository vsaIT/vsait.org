import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '@components/Footer';
import { ApiResponseType, EventType, RegisteredUserType } from '@lib/types';
import { SmallHeader } from '@lib/components/Header';
import Navigation from '@lib/components/Navigation';
import Image from 'next/image';
import { Button } from '@lib/components/Button';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';
import StyledSwal from '@lib/components/StyledSwal';
import { EventsDetailedSkeleton } from '@lib/components/Events';
import { getErrorMessage } from '@lib/utils';
import Link from 'next/link';

const Event: NextPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: false,
  });
  const { eventid } = router.query;
  const [registrationEnabled, setRegistrationEnabled] = useState(true);

  const { isSuccess, isLoading, error, data } = useQuery({
    queryKey: ['eventId', eventid],
    queryFn: () => fetch(`/api/events/${eventid}`).then((res) => res.json()),
    enabled: !!eventid,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });

  const register = useCallback(async () => {
    if (!eventid || !session?.user?.id) return;
    const melding = data.hasRegistered ? 'av' : 'på';
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
            if (data.statusCode === 200) return data;
            else throw new Error(data.message);
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
                    {data.hasRegistered ? 'Avmelding' : 'Påmelding'} på
                    arrangementet mislykket
                  </p>
                  <code className="mt-2 w-full">{getErrorMessage(error)}</code>
                </>
              ),
              showConfirmButton: false,
              timer: 5000,
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).finally(() => setRegistrationEnabled(true));
  }, [eventid, session?.user?.id, data?.hasRegistered, setRegistrationEnabled]);

  const showRegistrations = useCallback(() => {
    if (data?.registrations?.length >= 0) {
      StyledSwal.fire({
        title: <p>Liste over påmeldte</p>,
        html: (
          <div className="flex flex-col">
            {data.registrations.length > 0 ? (
              data.registrations.map((user: RegisteredUserType, i: number) => (
                <p
                  key={user.name + i}
                  className="border-t-2 border-slate-100 px-2"
                >
                  {user.name}
                </p>
              ))
            ) : (
              <p className="px-2">Ingen påmeldte...</p>
            )}
          </div>
        ),
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  }, [data?.registrations]);

  const event: EventType = data?.event;

  // Redirect to 404 if event not found
  if (!isLoading && !event) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Arrangementer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <SmallHeader />
        {status === 'loading' || isLoading || !isSuccess || data?.statusCode ? (
          <EventsDetailedSkeleton />
        ) : (
          <div className="flex flex-col z-10 max-w-screen-xl mb-32 gap-6 transform -translate-y-10 w-11/12">
            <div className="flex w-full bg-white shadow-2xl rounded-2xl p-6">
              <div className="w-full overflow-hidden">
                <Image
                  src={event.image}
                  alt="Vercel Logo"
                  width={1352}
                  height={564}
                  layout="responsive"
                />
              </div>
            </div>

            <div className="grid grid-cols-eventdetail text-left gap-6">
              <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
                <h2 className="font-bold text-2xl mb-4">Detaljer</h2>

                <div className="flex flex-col gap-2">
                  <p>
                    <b>Starttid:</b> {new Date(event.startTime).toDateString()}
                  </p>
                  <p>
                    <b>Sluttid:</b> {new Date(event.endTime).toDateString()}
                  </p>
                  <p>
                    <b>Påmeldingsfrist:</b>{' '}
                    {new Date(event.registrationDeadline).toDateString()}
                  </p>
                  <p>
                    <b>Avmeldingsfrist:</b>{' '}
                    {new Date(event.cancellationDeadline).toDateString()}
                  </p>
                  <p>
                    <b>Sted:</b> {event.location}
                  </p>
                  <p>
                    <b>Åpent for:</b>{' '}
                    {event.eventType === 'OPEN' ? 'Alle' : 'Medlemmer'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
                <h2 className="font-bold text-2xl mb-4">{event.title}</h2>
                <p className="italic mb-2">
                  Last edited: {new Date().toDateString()}
                </p>
                <p>{event.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-eventdetail text-left gap-6">
              <div className="flex flex-col">
                <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6 mb-6">
                  <h2 className="font-bold text-2xl mb-4">Påmelding</h2>
                  <div className="flex flex-col gap-2">
                    <p>
                      <b>Antall påmeldte:</b> {event.registrationList.length} /{' '}
                      {event.maxRegistrations}
                    </p>
                    <p>
                      <b>Venteliste:</b> {event.waitingList.length}
                    </p>
                    <div className="flex flex-col gap-3 mt-2">
                      {session?.user ? (
                        <>
                          <Button
                            onClick={() => showRegistrations()}
                            text="Se andre påmeldte"
                          />
                          {new Date() >=
                          new Date(event.registrationDeadline) ? (
                            <p className="text-center">
                              Arrangementet er ikke åpent for påmelding!
                            </p>
                          ) : new Date() >=
                              new Date(event.cancellationDeadline) &&
                            data.hasRegistered ? (
                            <p className="text-center">
                              Arrangementet er ikke lenger åpent for avmelding!
                            </p>
                          ) : (data.hasMembership &&
                              event.eventType === 'MEMBERSHIP') ||
                            event.eventType === 'OPEN' ? (
                            data.hasRegistered ? (
                              <Button
                                onClick={() =>
                                  registrationEnabled && register()
                                }
                                text="Meld deg av"
                              />
                            ) : (
                              <Button
                                onClick={() =>
                                  registrationEnabled && register()
                                }
                                text="Meld deg på"
                              />
                            )
                          ) : (
                            <div className="flex flex-col gap-1">
                              <p>
                                Dette arrangementet er kun åpen for medlemmer.
                              </p>
                              <p>
                                Vennligst søk om medlemsskap ved å gå inn på{' '}
                                <Link href="/profil">
                                  <a className="font-medium text-primary hover:underline">
                                    profil
                                  </a>
                                </Link>
                                .
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-center">
                          Du må være pålogget for å melde deg på arrangementet!
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {session?.user.role === 'ADMIN' && (
                  <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
                    <h2 className="font-bold text-2xl mb-4">Innslipp</h2>
                    <a
                      className="block w-full"
                      href={`/events/checkin/${eventid}`}
                    >
                      <Button text="Gå til innslipp" className="w-full" />
                    </a>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
                <h2 className="font-bold text-2xl mb-4">Info</h2>
                <div className="flex flex-col gap-4">
                  <p>
                    Til venstre kan man se antallet påmeldte. Hensikten bak
                    dette er hovedsakelig for å estimere hvor mye mat som skal
                    kjøpes inn. Det står også en maksgrense, som gjelder
                    hovedsakelig for mindre arrangementer der vi ikke kan være
                    alt for mange mennesker samlet (f. eks buldring, mini-golf
                    og bowling). Fortvil ikke dersom maksgrensen på et
                    arrangement nås, da du vil få muligheten til å melde deg på
                    ventelista for arrangementet - gitt at du er nummer 1 i
                    køen, vil du få plassen dersom noen melder seg av.
                  </p>
                  <p>
                    I boksen øverst til venstre, står det en oversikt over
                    start- og sluttid for arrangementet. Merk at det også står
                    påmeldings- og avmeldingsfrist som er viktige å forholde seg
                    til. Avmelding er spesielt viktig, dersom det er en
                    venteliste på arrangementet, slik at nestemann får plass.
                  </p>
                  <p>
                    PS! Husk å skriv ned mulige matvarer som kan forårsake
                    allergiske reaksjoner på profilen din, slik at vi kan
                    tilpasse mattilbudet på våre arrangementer etter deres
                    matbehov ♥.
                  </p>
                </div>
              </div>
            </div>

            {session?.user.role === 'ADMIN' && (
              <div className="flex flex-col text-left">
                <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
                  <h2 className="font-bold text-2xl mb-4">
                    Liste over påmeldte
                  </h2>
                  <div className="flex flex-col rounded-lg bg-slate-100 overflow-hidden text-xs">
                    <div className="flex bg-light py-2 px-10 mb-1 font-bold text-white">
                      <p className="w-1/3">Navn</p>
                      <p className="w-1/3">E-post</p>
                      <p className="w-1/3">Matbehov</p>
                    </div>
                    {data?.registrations?.map((user: RegisteredUserType) => (
                      <div
                        key={user.email}
                        className="flex rounded-md bg-white py-2 px-9 mx-1 mb-1"
                      >
                        <p className="w-1/3">{user.name}</p>
                        <p className="w-1/3">{user.email}</p>
                        <p className="w-1/3">{user.foodNeeds}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Event;
