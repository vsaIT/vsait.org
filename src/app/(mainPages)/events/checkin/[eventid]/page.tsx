'use client';
import { CurvyHeader } from '@/components/Header';
import StyledSwal from '@/components/StyledSwal';
import {
  CalendarOutline,
  CircleExclamation,
  Envelope,
  MapPin,
  Users,
} from '@/components/icons';
import { swalError, swalSuccess } from '@/lib/swal';
import {
  getLocaleDateString,
  getLocaleTimeString,
  isEventDay,
  postFetcher,
} from '@/lib/utils';
import { AttendingUserType, EventType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import CheckinList from './CheckinList';

const cardClass =
  'rounded-3xl bg-white p-6 shadow-sm sm:p-8';

function Checkin({ params }: { params: { eventid: string } }): JSX.Element {
  const { status, data: session } = useSession({
    required: true,
  });
  const { eventid } = params;
  const [registrationEnabled, setRegistrationEnabled] = useState(true);

  const { isLoading, error, data } = useQuery({
    queryKey: ['eventId', eventid],
    queryFn: () => fetch(`/api/checkin/${eventid}`).then((res) => res.json()),
    enabled: !!eventid,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });

  const event: EventType = data?.event;
  // Check-in is only available on the day the event takes place
  const isCheckinOpen = event
    ? isEventDay(event.startTime, event.endTime)
    : false;

  const register = useCallback(
    async (submitEvent: React.SyntheticEvent) => {
      submitEvent.preventDefault();
      if (!eventid || !session?.user?.id || !registrationEnabled) return;
      if (!isCheckinOpen) {
        swalError(
          'Innsjekk er ikke tilgjengelig',
          new Error(
            'Innsjekk er kun tilgjengelig på dagen arrangementet finner sted'
          )
        );
        return;
      }
      const target = submitEvent.target as typeof submitEvent.target & {
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
          try {
            const data = await postFetcher('/api/checkin/register', {
              userId: '',
              email: email,
              eventId: eventid,
            });
            console.log('Success:', data);
            await swalSuccess('Vi har registrert ditt oppmøte!');
          } catch (error) {
            swalError('Registrering av oppmøte mislykket', error as Error);
          } finally {
            setRegistrationEnabled(true);
          }
        },
      });
    },
    [
      eventid,
      setRegistrationEnabled,
      registrationEnabled,
      isCheckinOpen,
      session?.user?.id,
    ]
  );

  const loading = status === 'loading' || isLoading || !data;
  const attendances: AttendingUserType[] = data?.attendances ?? [];
  const checkedIn = attendances.filter((user) => user.checked).length;

  // Redirect user if not admin
  if (status === 'authenticated' && session.user.role === 'USER')
    window.location.href = '/';
  // Redirect to 404 if event not found
  if (!isLoading && !event) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  return (
    <>
      <CurvyHeader waveColor='#FDF8F0' height='sm:h-[28rem]'>
        <div className='relative z-20 mx-auto w-11/12 max-w-[58rem] text-left'>
          <Link
            href={`/events/${eventid}`}
            className='text-sm text-white/85 transition-all duration-300 hover:text-white'
          >
            ← Tilbake til arrangementet
          </Link>

          <p className='mt-6 text-xs uppercase tracking-[0.18em] text-white'>
            Innsjekk
          </p>
          {loading ? (
            <div className='mt-3 h-12 w-3/4 max-w-xl animate-pulse rounded-2xl bg-white/30' />
          ) : (
            <h1 className='mt-2 max-w-3xl text-4xl leading-snug text-white sm:text-5xl'>
              {event.title}
            </h1>
          )}

          {loading ? (
            <div className='mt-6 h-4 w-72 animate-pulse rounded-full bg-white/30' />
          ) : (
            <div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white'>
              <span className='flex items-center gap-2'>
                <CalendarOutline color='#FFFFFF' className='h-4 w-4 shrink-0' />
                {getLocaleDateString(event.startTime)},{' '}
                {getLocaleTimeString(event.startTime)}–
                {getLocaleTimeString(event.endTime)}
              </span>
              <span className='flex items-center gap-2'>
                <MapPin color='#FFFFFF' className='h-4 w-4 shrink-0' />
                {event.location}
              </span>
            </div>
          )}
        </div>
      </CurvyHeader>

      <section className='w-full bg-cream pb-20'>
        <div className='mx-auto flex w-11/12 max-w-[58rem] flex-col gap-8 pt-6 text-left'>
          <div className='overflow-hidden rounded-3xl shadow-sm'>
            {loading ? (
              <div className='aspect-[1352/564] w-full' />
            ) : (
              <Image
                src={(event.image as string) || '/placeholder.png'}
                alt={event.title}
                width={1352}
                height={564}
                sizes='(max-width: 1215px) 95vw, 1115px'
                priority
                className='h-auto w-full object-cover'
              />
            )}
          </div>

          <div className={cardClass}>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
              <div>
                <h2 className='text-xl '>Registrer oppmøte</h2>
                <p className='mt-1 text-sm text-gray'>
                  Skriv inn e-posten deltakeren registrerte seg med.
                </p>
              </div>

              {!loading && (
                <div className='sm:w-48'>
                  <p className='flex items-center gap-2 text-sm '>
                    <Users color='#D5564D' className='h-4 w-4 shrink-0' />
                    {checkedIn} / {attendances.length} innsjekket
                  </p>
                  <div className='mt-2 h-1.5 w-full overflow-hidden rounded-full bg-primary/10'>
                    <div
                      className='h-full rounded-full bg-primary transition-all duration-500'
                      style={{
                        width: `${
                          attendances.length
                            ? (checkedIn / attendances.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {!loading && !isCheckinOpen && (
              <p className='mt-6 flex items-start gap-3 rounded-xl bg-primary/[0.06] p-4 text-sm leading-relaxed '>
                <CircleExclamation
                  color='#D5564D'
                  className='mt-0.5 h-4 w-4 shrink-0'
                />
                <span>
                  Innsjekk er stengt. Oppmøte kan kun registreres{' '}
                  {getLocaleDateString(event.startTime)}, dagen arrangementet
                  finner sted.
                </span>
              </p>
            )}

            <form className='mt-6' onSubmit={register}>
              <label
                htmlFor='email'
                className='block text-left text-[0.7rem] uppercase tracking-[0.14em] text-gray'
              >
                E-post
              </label>
              <div className='mt-2 flex flex-col gap-3 sm:flex-row'>
                <div className='relative flex-1'>
                  <Envelope
                    color='#D5564D'
                    className='pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2'
                  />
                  <input
                    id='email'
                    type='email'
                    autoComplete='email'
                    placeholder='deltaker@epost.no'
                    required
                    disabled={loading || !isCheckinOpen}
                    className='w-full rounded-xl border border-primary/20 bg-white py-3 pl-11 pr-4 text-left text-sm  shadow-sm outline-none transition-all duration-300 placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-stone-50'
                  />
                </div>
                <button
                  type='submit'
                  disabled={loading || !isCheckinOpen}
                  className='w-full shrink-0 rounded-full bg-primary px-8 py-3 text-sm text-white shadow-md transition-all duration-300 hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100 sm:w-auto'
                >
                  Sjekk inn →
                </button>
              </div>
            </form>
          </div>

          <CheckinList attendances={attendances} />
        </div>
      </section>
    </>
  );
}

export default Checkin;
