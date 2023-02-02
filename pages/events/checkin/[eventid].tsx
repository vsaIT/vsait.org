import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '@components/Footer';
import { ApiResponseType, AttendingUserType, EventType } from '@lib/types';
import { SmallHeader } from '@lib/components/Header';
import { Navigation } from '@lib/components/Navigation';
import Image from 'next/image';
import { Button } from '@lib/components/Input';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import StyledSwal from '@lib/components/StyledSwal';
import { getErrorMessage } from '@lib/utils';
import { Person } from '@lib/icons';
import Accordion from '@lib/components/Accordion';
import Link from 'next/link';

const Checkin: NextPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
  });
  const { eventid } = router.query;
  const [registrationEnabled, setRegistrationEnabled] = useState(true);

  const { isSuccess, isLoading, error, data } = useQuery({
    queryKey: ['eventId', eventid],
    queryFn: () => fetch(`/api/checkin/${eventid}`).then((res) => res.json()),
    enabled: !!eventid,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });

  const register = useCallback(
    async (event: React.SyntheticEvent) => {
      event.preventDefault();
      if (!eventid || !session?.user?.id || !registrationEnabled) return;
      const target = event.target as typeof event.target & {
        email: { value: string };
      };
      const email = target.email.value;
      StyledSwal.fire({
        icon: 'info',
        title: <p>Bekreftelse!</p>,
        text: `Registrer ditt oppmøte på arrangementet`,
        showCancelButton: false,
        showConfirmButton: false,
        confirmButtonText: `Ok`,
        cancelButtonText: 'Avbryt',
        showLoaderOnConfirm: true,
        didOpen: () => {
          // Confirm immediately when open swal
          StyledSwal.getConfirmButton()?.click();
        },
        preConfirm: async () => {
          // Disable registration spamming
          setRegistrationEnabled(false);
          // Hide cancel button when loading
          const cancelButton = StyledSwal.getCancelButton();
          if (cancelButton) cancelButton.style.opacity = '0';
          // Send registration request
          await fetch('/api/checkin/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: '',
              email: email,
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
                title: <p>Vellykket!</p>,
                text: 'Vi har registret ditt oppmøte!',
                showConfirmButton: false,
                timer: 1500,
              });
              window.location.reload();
            })
            .catch((error: unknown) => {
              return StyledSwal.fire({
                icon: 'error',
                title: <p>Mislykket!</p>,
                html: (
                  <>
                    <p>Registrering av oppmøte mislykket</p>
                    <code className="mt-2 w-full">
                      {getErrorMessage(error)}
                    </code>
                  </>
                ),
                showConfirmButton: false,
                timer: 5000,
              });
            });
        },
        allowOutsideClick: () => false,
      }).finally(() => setRegistrationEnabled(true));
    },
    [eventid, setRegistrationEnabled, registrationEnabled]
  );

  const event: EventType = data?.event;
  const loading =
    status === 'loading' || isLoading || !isSuccess || data?.statusCode !== 200;

  // Redirect user if not admin
  if (status === 'authenticated' && session.user.role === 'USER')
    window.location.href = '/';
  // Redirect to 404 if event not found
  if (!isLoading && !event) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Check-in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center text-center">
        <SmallHeader />
        <div className="flex flex-col z-10 max-w-screen-xl mb-32 gap-6 transform -translate-y-10 w-11/12">
          <div className="flex w-full bg-white shadow-2xl rounded-2xl p-6">
            {loading ? (
              <div className="w-full rounded-l-2xl overflow-hidden">
                <div className="bg-slate-400 rounded-md animate-pulse w-full">
                  <Image
                    src="/placeholder.png"
                    alt="Vercel Logo"
                    width={1352}
                    height={564}
                    layout="responsive"
                    className="opacity-0"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full overflow-hidden">
                <Image
                  src={event.image}
                  alt="Vercel Logo"
                  width={1352}
                  height={564}
                  layout="responsive"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col text-left">
            <div className="flex flex-col w-full bg-white shadow-2xl rounded-2xl p-6">
              {loading ? (
                <h2 className="font-bold text-2xl mb-4 bg-slate-400 p-4 rounded-md animate-pulse w-4/12 mx-auto text-center"></h2>
              ) : (
                <h2 className="font-bold text-2xl mb-4 text-center">
                  <Link href={`/events/${eventid}`}>
                    <a className="text-primary hover:underline">
                      {event.title}
                    </a>
                  </Link>
                </h2>
              )}

              <form className="text-center w-full" onSubmit={register}>
                <div className="flex w-full justify-center items-center mb-6">
                  <div className="relative w-7/12">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
                    >
                      E-post
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="E-post"
                        required
                        className="h-10 w-full py-2 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="w-3/12 px-2 h-10 mt-1">
                    <Button text="Innsjekk" className="w-full" />
                  </div>
                </div>
              </form>
              <div className="flex flex-col gap-1 mx-auto mb-2">
                <p className="flex items-center gap-3">
                  <Person color="inherit" className="flex h-5 w-5 fill-black" />
                  {
                    data?.attendances?.filter(
                      (u: AttendingUserType) => u.checked
                    ).length
                  }{' '}
                  / {data?.attendances?.length} innsjekket
                </p>
              </div>
            </div>
          </div>

          <Accordion className="bg-white shadow-2xl rounded-2xl">
            <div className="flex flex-col text-left p-2">
              <div className="flex flex-col w-full p-6">
                <h2 className="font-bold text-2xl mb-4">Liste over påmeldte</h2>
                <div className="flex flex-col rounded-lg bg-slate-100 overflow-hidden text-xs">
                  <div className="flex bg-light py-2 px-10 mb-1 font-bold text-white">
                    <p className="w-1/4">Navn</p>
                    <p className="w-1/4">E-post</p>
                    <p className="w-1/4">Matbehov</p>
                    <p className="w-1/4">Checked</p>
                  </div>
                  {data?.attendances?.map((user: AttendingUserType) => (
                    <div
                      key={user.email}
                      className="flex rounded-md bg-white py-2 px-9 mx-1 mb-1"
                    >
                      <p className="w-1/4">{user.name}</p>
                      <p className="w-1/4">{user.email}</p>
                      <p className="w-1/4">{user.foodNeeds}</p>
                      <p className="w-1/4">{user.checked ? '✔️' : ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkin;
