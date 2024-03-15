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
import StyledSwal from '@/components/StyledSwal';
import { getLocaleDatetimeString, getMembershipYear } from '@/lib/utils';
import { ApiResponseType, CardProps } from '@/types/types';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type UserFormValues = {
  foodNeeds: string;
  student: string;
  publicProfile: boolean;
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

const Card = ({ user, session }: CardProps) => {
  const [attendanceCount, setAttendanceCount] = useState(5);
  const { register, handleSubmit, setValue } = useForm<UserFormValues>();
  const { register: registerPassword, handleSubmit: handlePasswordSubmit } =
    useForm<PasswordFormValues>();

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
            .then((_data) => {
              StyledSwal.fire({
                icon: 'success',
                title: 'Passord ble oppdatert',
                showConfirmButton: false,
                timer: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
              StyledSwal.fire({
                icon: 'error',
                title: 'Brukerinformasjon ble ikke oppdatert',
                text: error.message,
                timer: 2000,
              });
            });
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
          // Confirm immediately when open swal
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
            .then((_data) => {
              StyledSwal.fire({
                icon: 'success',
                title: 'Brukerinformasjonen ble oppdatert',
                showConfirmButton: false,
                timer: 2000,
              });
            })
            .catch((_error) => {
              StyledSwal.fire({
                icon: 'error',
                title: 'Brukerinformasjon ble ikke oppdatert',
                text: 'Ser ut som det var noe som gikk galt',
                timer: 2000,
              });
            });
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
      <div className='w-full rounded-xl border border-stone-300'>
        <form onSubmit={handleSubmit(updateUserData)}>
          <div className='flex flex-col border-stone-300'>
            <div className='flex h-16 flex-col justify-center rounded-t-xl border-b border-stone-300 bg-neutral-50 shadow-md'>
              <h1 className='py-6 pl-4 text-left text-xl font-medium'>
                Brukerinformasjon
              </h1>
            </div>
            <div className='flex flex-col border-b border-stone-300 sm:grid sm:grid-cols-2'>
              <div className='grid grid-rows-2 border-r border-stone-300'>
                <div className='h-full border-b border-stone-300 py-5 pl-4 text-left'>
                  <p className='text-stone-500'>Navn:</p>
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div className='h-full py-5 pl-4 text-left'>
                  <p className='text-stone-500'>E-post:</p>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className='my-5 flex flex-col px-12'>
                <div className='pb-3'>
                  <label
                    htmlFor='foodNeeds'
                    className='relative left-4 top-3 block w-fit bg-white px-2 text-left text-sm font-medium text-stone-500'
                  >
                    Matbehov
                  </label>
                  <div>
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
                      className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                    />
                  </div>
                </div>

                <div className='pb-3'>
                  <label
                    htmlFor='education'
                    className='relative left-4 top-3 block w-fit bg-white px-2 text-left text-sm font-medium text-stone-500'
                  >
                    Utdanningsinstutisjon*
                  </label>
                  <div>
                    <Select
                      id='student'
                      options={studentSelectOptions}
                      register={register}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='my-5 flex h-16 flex-col justify-center'>
              <div className='my-10'>
                <Button type='submit' text='Oppdater' className='bg-light' />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className='mt-10 flex w-full flex-col rounded-xl border border-stone-300'>
        <div className='flex h-16 flex-col justify-center rounded-t-xl border-b border-stone-300 bg-neutral-50 shadow-md'>
          <h1 className='py-6 pl-4 text-left text-xl font-medium'>
            Medlemskap
          </h1>
        </div>
        <div className='flex flex-col sm:flex-row'>
          <div className='flex h-fit flex-col border-b border-stone-300 py-5 pl-4 text-left sm:w-full sm:border-b-0 sm:border-r'>
            <p className='text-stone-500'>Status:</p>
            {user.membership.some(
              ({ year }) => year === getMembershipYear()
            ) ? (
              <p>
                Medlemskap bekreftet for {getMembershipYear()}/
                {getMembershipYear() + 1}
              </p>
            ) : (
              <p>Ingen aktiv medlemskap</p>
            )}
          </div>
          <div className='flex h-fit flex-col py-5 pl-4 text-left sm:w-full'>
            <p className='text-stone-500'>Tidligere medlemskap:</p>
            {user.membership.map(({ year }) =>
              year !== getMembershipYear() ? (
                <p key={year}>
                  {year}/{year + 1}
                </p>
              ) : null
            )}
          </div>
        </div>
      </div>

      <div className='mt-10 flex flex-col rounded-xl border border-stone-300'>
        <Accordion
          label='Endre passord'
          labelClassName='text-xl font-medium text-left pl-2 py-4'
          buttonClassName='bg-neutral-50 shadow-md'
        >
          <form
            onSubmit={handlePasswordSubmit(updateUserPassword)}
            className='px-4 py-4 sm:mx-28 sm:my-10'
          >
            <div className='sm:mx-5'>
              <label
                htmlFor='old-password'
                className='relative left-4 top-3 block w-fit bg-white px-2 text-left text-sm font-medium text-stone-500'
              >
                Nåværende passord*
              </label>
              <input
                id='old-password'
                {...registerPassword('oldPassword', {
                  minLength: 8,
                })}
                minLength={8}
                type='password'
                className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
              />
            </div>

            <div className='sm:mx-5'>
              <label
                htmlFor='new-password'
                className='relative left-4 top-3 block w-fit bg-white px-2 text-left text-sm font-medium text-stone-500'
              >
                Nytt passord*
              </label>
              <input
                id='new-password'
                {...registerPassword('newPassword', {
                  minLength: 8,
                })}
                minLength={8}
                type='password'
                className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
              />
            </div>

            <div className='sm:mx-5'>
              <label
                htmlFor='confirm-password'
                className='relative left-4 top-3 block w-fit bg-white px-2 text-left text-sm font-medium text-stone-500'
              >
                Bekreft nytt passord*
              </label>
              <input
                id='confirm-password'
                {...registerPassword('confirmPassword', {
                  minLength: 8,
                })}
                minLength={8}
                type='password'
                className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
              />
            </div>

            <div className='my-5 flex h-16 flex-col justify-center'>
              <div className='my-10'>
                <Button
                  type='submit'
                  text='Bytt passord'
                  className='bg-light'
                />
              </div>
            </div>
          </form>
        </Accordion>
      </div>

      <div className='mt-10 flex flex-col rounded-xl border border-stone-300'>
        <Accordion
          label='Statistikk'
          labelClassName='text-xl font-medium text-left pl-2 py-4'
          buttonClassName='bg-neutral-50 shadow-md'
        >
          <div className='flex min-h-[320px] flex-col justify-evenly gap-4 px-4 py-4'>
            <div className=''>
              <p>
                Du har vært med på {user?.userAttendanceList?.length || 0}{' '}
                arrangementer så langt!
              </p>
            </div>

            {user?.userAttendanceList
              ?.slice(
                0,
                Math.min(attendanceCount, user?.userAttendanceList?.length)
              )
              .map(({ event }) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className='text-bold flex w-full justify-between rounded-lg border border-stone-200 bg-stone-200 px-6 py-3 text-left text-sm text-stone-700'
                >
                  <span>{event.title}</span>
                  <span>{`${getLocaleDatetimeString(
                    event.startTime
                  )} - ${getLocaleDatetimeString(event.endTime)}`}</span>
                </Link>
              ))}

            {attendanceCount < (user?.userAttendanceList?.length || 0) ? (
              <div className='my-5 flex h-16 flex-col justify-center'>
                <div className='my-10'>
                  <Button
                    onClick={() => setAttendanceCount((prev) => prev + 5)}
                    type='submit'
                    text='Vis mer'
                    className='border-2 border-light'
                    inverted
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Accordion>
      </div>
    </>
  );
};

export default Card;
