/**
 * Represents a Card component that displays user information and allows updating user data.
 *
 * @component
 * @param {CardProps} props - The props for the Card component.
 * @param {User} props.user - The user object containing user information.
 * @param {Session} props.session - The session object containing session information.
 * @returns {JSX.Element} The JSX element representing the Card component.
 */

import { Accordion } from '@/components/Accordion';
import { Button, Select } from '@/components/Input';
import StatusPill from '@/components/StatusPill';
import StyledSwal from '@/components/StyledSwal';
import { swalError, swalSuccess } from '@/lib/swal';
import { getLocaleDatetimeString, getMembershipYear } from '@/lib/utils';
import { ApiResponseType, AttendedEventType, CardProps } from '@/types/types';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type UserFormValues = {
  foodNeeds: string;
  student: string;
};

type PasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const studentSelectOptions = [
  { value: 'NTNU', label: 'Norges teknisk-naturvitenskapelige universitet' },
  { value: 'BI', label: 'Handelshøyskolen BI' },
  { value: 'DMMH', label: 'Dronning Mauds Minne Høgskole' },
  { value: 'Non-student', label: 'Ikke student' },
  { value: 'Other', label: 'Andre' },
];

const FIELD_LABEL = 'text-[0.625rem] uppercase tracking-[0.20em] text-gray';
const TEXT_INPUT =
  'mt-1.5 w-full rounded-xl border-2 border-stone-200 bg-transparent px-4 py-2.5 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out focus:border-primary/40';

const Panel = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className='overflow-hidden rounded-2xl bg-white text-left shadow-sm'>
    <h2 className='border-b border-primary/10 px-6 py-4 text-sm '>
      {title}
    </h2>
    {children}
  </div>
);

const Card = ({ user, session }: CardProps) => {
  const [attendanceCount, setAttendanceCount] = useState(5);
  // Events the user signed up for that have already finished
  const attendedEvents = (user?.userRegistrationList ?? [])
    .map(({ event }) => event)
    .filter((event): event is AttendedEventType => !!event);
  const { register, handleSubmit, setValue } = useForm<UserFormValues>();
  const { register: registerPassword, handleSubmit: handlePasswordSubmit } =
    useForm<PasswordFormValues>();

  const membershipYear = getMembershipYear();
  const isMember = !!user.membership?.some(
    ({ year }) => year === membershipYear
  );
  const previousMemberships = (user.membership ?? [])
    .map(({ year }) => year)
    .filter((year) => year !== membershipYear)
    .sort((a, b) => b - a);

  const updateUserPassword = useCallback(
    (data: PasswordFormValues) => {
      StyledSwal.fire({
        text: '',
        showConfirmButton: false,
        showLoaderOnConfirm: true,
        didOpen: () => {
          // Confirm immediately when open swal
          StyledSwal.getConfirmButton()?.click();
        },
        preConfirm: async () => {
          await fetch(`/api/user/${session?.user.id}/password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then(async (response) => {
              if (!response.ok) throw new Error(response.statusText);
              const data: ApiResponseType = await response.json();
              return data;
            })
            .then((_data) => swalSuccess('Passord ble oppdatert'))
            .catch((error) => swalError('Passord ble ikke oppdatert', error));
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    },
    [session?.user.id]
  );

  const updateUserData = useCallback(
    (data: UserFormValues) => {
      StyledSwal.fire({
        text: '',
        showConfirmButton: false,
        showLoaderOnConfirm: true,
        didOpen: () => {
          StyledSwal.getConfirmButton()?.click();
        },
        preConfirm: async () => {
          await fetch(`/api/user/${session?.user.id}/information`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then(async (response) => {
              if (!response.ok) throw new Error(response.statusText);
              const data: ApiResponseType = await response.json();
              return data;
            })
            .then((_data) => swalSuccess('Brukerinformasjonen ble oppdatert'))
            .catch((_error) =>
              swalError('Brukerinformasjon ble ikke oppdatert', _error)
            );
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    },
    [session?.user?.id]
  );

  useEffect(() => {
    if (user.id === '') return;
    setValue('foodNeeds', user.foodNeeds);
    setValue('student', user.student as string);
  }, [user, setValue]);

  if (session?.user?.id !== user.id) {
    return null;
  }

  return (
    <>
      <Panel title='Brukerinformasjon'>
        <form onSubmit={handleSubmit(updateUserData)}>
          <div className='grid gap-5 px-6 py-6 sm:grid-cols-2'>
            <div>
              <p className={FIELD_LABEL}>Navn</p>
              <p className='mt-1.5 text-sm '>
                {user.firstName} {user.lastName}
              </p>
            </div>

            <div>
              <label htmlFor='foodNeeds' className={FIELD_LABEL}>
                Matbehov
              </label>
              <input
                id='foodNeeds'
                type='text'
                {...register('foodNeeds')}
                autoComplete='allergies'
                placeholder={
                  user.foodNeeds === ''
                    ? 'Matallergi og intoleranse'
                    : user.foodNeeds
                }
                className={TEXT_INPUT}
              />
            </div>

            <div>
              <p className={FIELD_LABEL}>E-post</p>
              <p className='mt-1.5 break-words text-sm '>
                {user.email}
              </p>
            </div>

            <div>
              <label htmlFor='student' className={FIELD_LABEL}>
                Utdanningsinstitusjon
              </label>
              <div className='mt-1.5'>
                <Select
                  id='student'
                  options={studentSelectOptions}
                  register={register}
                />
              </div>
            </div>
          </div>

          <div className='border-t border-primary/10 px-6 py-4 text-center'>
            <Button
              type='submit'
              text='Oppdater'
              className='w-full border border-primary !text-primary bg-white !rounded-full !px-8 !py-2.5 text-sm sm:w-44'
            />
          </div>
        </form>
      </Panel>

      <Panel title='Medlemskap'>
        <div className='grid gap-5 px-6 py-6 sm:grid-cols-2'>
          <div>
            <p className={FIELD_LABEL}>Status</p>
            <div className='mt-1.5'>
              <StatusPill active={isMember}>
                {isMember
                  ? `Bekreftet for ${membershipYear}/${membershipYear + 1}`
                  : 'Ingen aktiv medlemskap'}
              </StatusPill>
            </div>
          </div>

          <div>
            <p className={FIELD_LABEL}>Tidligere medlemskap</p>
            <p className='mt-1.5 text-sm '>
              {previousMemberships.length > 0
                ? previousMemberships
                    .map((year) => `${year}/${year + 1}`)
                    .join(' · ')
                : 'Ingen'}
            </p>
          </div>
        </div>
      </Panel>

      <div className='overflow-hidden rounded-2xl bg-white text-left shadow-sm'>
        <Accordion
          label='Endre passord'
          labelClassName='pl-4 py-2 text-sm '
          buttonClassName='px-2 py-2'
        >
          <form
            onSubmit={handlePasswordSubmit(updateUserPassword)}
            className='flex flex-col gap-4 border-t border-primary/10 px-6 py-6'
          >
            <div>
              <label htmlFor='old-password' className={FIELD_LABEL}>
                Nåværende passord*
              </label>
              <input
                id='old-password'
                {...registerPassword('oldPassword', {
                  minLength: 8,
                })}
                minLength={8}
                type='password'
                className={TEXT_INPUT}
              />
            </div>

            <div>
              <label htmlFor='new-password' className={FIELD_LABEL}>
                Nytt passord*
              </label>
              <input
                id='new-password'
                {...registerPassword('newPassword', {
                  minLength: 8,
                })}
                minLength={8}
                type='password'
                className={TEXT_INPUT}
              />
            </div>

            <div>
              <label htmlFor='confirm-password' className={FIELD_LABEL}>
                Bekreft nytt passord*
              </label>
              <input
                id='confirm-password'
                {...registerPassword('confirmPassword', {
                  minLength: 8,
                })}
                minLength={8}
                type='password'
                className={TEXT_INPUT}
              />
            </div>

            <div className='pt-1 text-center'>
              <Button
                type='submit'
                text='Bytt passord'
                className='w-full border border-primary !text-primary bg-white !rounded-full !px-8 !py-2.5 text-sm sm:w-44'
              />
            </div>
          </form>
        </Accordion>
      </div>

      <div className='overflow-hidden rounded-2xl bg-white text-left shadow-sm'>
        <Accordion
          label='Statistikk'
          labelClassName='pl-4 py-2 text-sm '
          buttonClassName='px-2 py-2'
        >
          <div className='flex flex-col gap-3 border-t border-primary/10 px-6 py-6'>
            <p className='text-sm text-gray'>
              Du har vært med på {attendedEvents.length} arrangementer så langt!
            </p>

            {attendedEvents
              .slice(0, Math.min(attendanceCount, attendedEvents.length))
              .map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className='flex flex-col gap-1 rounded-xl bg-primary/[0.06] px-4 py-3 text-left text-xs text-gray transition-all duration-300 hover:brightness-95 sm:flex-row sm:items-center sm:justify-between'
                >
                  <span className=''>{event.title}</span>
                  <span>{`${getLocaleDatetimeString(
                    event.startTime
                  )} - ${getLocaleDatetimeString(event.endTime)}`}</span>
                </Link>
              ))}

            {attendanceCount < attendedEvents.length ? (
              <div className='pt-1 text-center'>
                <Button
                  onClick={() => setAttendanceCount((prev) => prev + 5)}
                  type='button'
                  text='Vis mer'
                  className='!rounded-full border-2 border-primary !px-8 !py-2 text-sm !text-primary'
                  inverted
                />
              </div>
            ) : null}
          </div>
        </Accordion>
      </div>
    </>
  );
};

export default Card;
