'use client';
import { Accordion } from '@/components/Accordion';
import { SmallHeader } from '@/components/Header';
import { Button } from '@/components/Input';
import StyledSwal from '@/components/StyledSwal';
import { Person } from '@/components/icons';
import { getErrorMessage } from '@/lib/utils';
import { ApiResponseType, AttendingUserType, EventType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

function Checkin({ params }: { params: { eventid: string } }): JSX.Element {
  const { status, data: session } = useSession({
    required: true,
  });
  const { eventid } = params;
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
              return data;
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
                    <code className='mt-2 w-full'>
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
    <>
      <SmallHeader />
      <div className='z-10 mb-32 flex w-11/12 max-w-screen-xl -translate-y-10 transform flex-col gap-6'>
        <div className='flex w-full rounded-2xl bg-white p-6 shadow-2xl'>
          {loading ? (
            <div className='w-full overflow-hidden rounded-l-2xl'>
              <div className='w-full animate-pulse rounded-md bg-slate-400'>
                <Image
                  src='/placeholder.png'
                  alt='Vercel Logo'
                  width={1352}
                  height={564}
                  className='opacity-0'
                  sizes='100vw'
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            </div>
          ) : (
            <div className='w-full overflow-hidden'>
              <Image
                src={event.image as string}
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
          )}
        </div>

        <div className='flex flex-col text-left'>
          <div className='flex w-full flex-col rounded-2xl bg-white p-6 shadow-2xl'>
            {loading ? (
              <h2 className='mx-auto mb-4 w-4/12 animate-pulse rounded-md bg-slate-400 p-4 text-center text-2xl font-bold'></h2>
            ) : (
              <h2 className='mb-4 text-center text-2xl font-bold'>
                <Link
                  href={`/events/${eventid}`}
                  className='text-primary hover:underline'
                >
                  {event.title}
                </Link>
              </h2>
            )}

            <form className='w-full text-center' onSubmit={register}>
              <div className='mb-6 flex w-full items-center justify-center'>
                <div className='relative w-7/12'>
                  <label
                    htmlFor='email'
                    className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                  >
                    E-post
                  </label>
                  <div className='mt-1'>
                    <input
                      id='email'
                      type='email'
                      autoComplete='email'
                      placeholder='E-post'
                      required
                      className='h-10 w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-2 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                    />
                  </div>
                </div>
                <div className='mt-1 h-10 w-3/12 px-2'>
                  <Button text='Innsjekk' className='w-full' />
                </div>
              </div>
            </form>
            <div className='mx-auto mb-2 flex flex-col gap-1'>
              <p className='flex items-center gap-3'>
                <Person color='inherit' className='flex h-5 w-5 fill-black' />
                {
                  data?.attendances?.filter((u: AttendingUserType) => u.checked)
                    .length
                }{' '}
                / {data?.attendances?.length} innsjekket
              </p>
            </div>
          </div>
        </div>

        <Accordion className='rounded-2xl bg-white shadow-2xl'>
          <div className='flex flex-col p-2 text-left'>
            <div className='flex w-full flex-col p-6'>
              <h2 className='mb-4 text-2xl font-bold'>Liste over påmeldte</h2>
              <div className='flex flex-col overflow-hidden rounded-lg bg-slate-100 text-xs'>
                <div className='mb-1 flex bg-light px-10 py-2 font-bold text-white'>
                  <p className='w-1/4'>Navn</p>
                  <p className='w-1/4'>E-post</p>
                  <p className='w-1/4'>Matbehov</p>
                  <p className='w-1/4'>Checked</p>
                </div>
                {data?.attendances?.map((user: AttendingUserType) => (
                  <div
                    key={user.email}
                    className='mx-1 mb-1 flex rounded-md bg-white px-9 py-2'
                  >
                    <p className='w-1/4'>{user.name}</p>
                    <p className='w-1/4'>{user.email}</p>
                    <p className='w-1/4'>{user.foodNeeds}</p>
                    <p className='w-1/4'>{user.checked ? '✔️' : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Accordion>
      </div>
    </>
  );
}

export default Checkin;
