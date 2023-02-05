import { Button, Select } from '@components/Input';
import { ApiResponseType, CardProps } from '@lib/types';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import StyledSwal from '@components/StyledSwal';
import {
  getLocaleDateString,
  getLocaleDatetimeString,
  getMembershipYear,
} from '@lib/utils';
import Swal from 'sweetalert2';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Accordion } from '@components/Accordion';

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
              if (data.statusCode === 200) return data;
              else throw new Error(data.message);
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
              if (data.statusCode === 200) return data;
              else throw new Error(data.message);
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
    [user, session?.user?.id]
  );

  useEffect(() => {
    if (user.id === '') return;
    setValue('foodNeeds', user.foodNeeds);
    setValue('student', user.student);
    setValue('publicProfile', user.publicProfile);
  }, [user, setValue]);

  return (
    <>
      <div className="w-full border rounded-xl border-stone-300">
        <form onSubmit={handleSubmit(updateUserData)}>
          <div className="flex flex-col border-stone-300">
            <div className="flex flex-col h-16 border-b border-stone-300 bg-neutral-50 shadow-md rounded-t-xl justify-center">
              <h1 className="text-xl font-medium text-left pl-4 py-6">
                Brukerinformasjon
              </h1>
            </div>
            <div className="flex flex-col sm:grid sm:grid-cols-2 border-b border-stone-300">
              <div className="grid grid-rows-3 border-r border-stone-300">
                <div className="border-b border-stone-300 text-left pl-4 py-5 h-fit">
                  <p className="text-stone-500">Navn:</p>
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div className="border-b border-stone-300 text-left pl-4 py-5 h-fit">
                  <p className="text-stone-500">E-post:</p>
                  <p>{user.email}</p>
                </div>
                <div className="border-b border-stone-300 sm:border-0 text-left pl-4 py-5 h-fit">
                  <p className="text-stone-500">Fødselsdato:</p>
                  <p>{getLocaleDateString(new Date(user.birthdate))}</p>
                </div>
              </div>
              <div className="flex flex-col px-12 my-5">
                <div className="pb-3">
                  <label
                    htmlFor="foodNeeds"
                    className="block text-sm font-medium text-left text-stone-500 bg-white w-fit relative left-4 top-3 px-2"
                  >
                    Matbehov
                  </label>
                  <div>
                    <input
                      id="foodNeeds"
                      type="text"
                      {...register('foodNeeds')}
                      autoComplete="allergies"
                      placeholder={
                        user.foodNeeds === ''
                          ? 'Matallergi og intoleranse'
                          : user.foodNeeds
                      }
                      className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                    />
                  </div>
                </div>

                <div className="pb-3">
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium text-left text-stone-500 bg-white w-fit relative left-4 top-3 px-2"
                  >
                    Utdanningsinstutisjon*
                  </label>
                  <div>
                    <Select
                      id="student"
                      options={studentSelectOptions}
                      register={register}
                    />
                  </div>
                </div>

                <div className="w-full py-5 text-left">
                  <label
                    className="relative inline-flex items-center cursor-pointer"
                    htmlFor="publicProfile"
                  >
                    <input
                      id="publicProfile"
                      type="checkbox"
                      className="sr-only peer"
                      {...register('publicProfile')}
                    />
                    <div
                      className="w-11 h-6 bg-placeholder peer-focus:outline-none peer-focus:ring-4
                  rounded-full peer peer-checked:after:translate-x-full
                  peer-checked:after:border-white after:content-[''] after:absolute
                  after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
                 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                    ></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      Synlig brukerprofil
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center h-16 my-5">
              <div className="my-10">
                <Button type="submit" text="Oppdater" className="bg-light" />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="flex flex-col w-full border rounded-xl border-stone-300 mt-10">
        <div className="flex flex-col border-b h-16 border-stone-300 bg-neutral-50 shadow-md rounded-t-xl justify-center">
          <h1 className="text-xl font-medium text-left pl-4 py-6">
            Medlemskap
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-col sm:border-r sm:border-b-0 border-b border-stone-300 text-left pl-4 py-5 h-fit sm:w-full">
            <p className="text-stone-500">Status:</p>
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
          <div className="flex flex-col text-left pl-4 py-5 h-fit sm:w-full">
            <p className="text-stone-500">Tidligere medlemskap:</p>
            {user.membership.map(({ year }) =>
              year !== getMembershipYear() ? (
                <p>
                  {year}/{year + 1}
                </p>
              ) : null
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col border rounded-xl border-stone-300 mt-10">
        <Accordion
          label="Endre passord"
          labelClassName="text-xl font-medium text-left pl-2 py-4"
          buttonClassName="bg-neutral-50 shadow-md"
        >
          <form
            onSubmit={handlePasswordSubmit(updateUserPassword)}
            className="sm:mx-28 py-4 px-4 sm:my-10"
          >
            <div className="sm:mx-5">
              <label
                htmlFor="old-password"
                className="block text-sm font-medium text-left text-stone-500 bg-white w-fit left-4 top-3 px-2 relative"
              >
                Nåværende passord*
              </label>
              <input
                id="old-password"
                {...registerPassword('oldPassword', {
                  minLength: 8,
                })}
                minLength={8}
                type="password"
                className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
              />
            </div>

            <div className="sm:mx-5">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-left text-stone-500 bg-white w-fit left-4 top-3 px-2 relative"
              >
                Nytt passord*
              </label>
              <input
                id="new-password"
                {...registerPassword('newPassword', {
                  minLength: 8,
                })}
                minLength={8}
                type="password"
                className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
              />
            </div>

            <div className="sm:mx-5">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-left text-stone-500 bg-white w-fit left-4 top-3 px-2 relative"
              >
                Bekreft nytt passord*
              </label>
              <input
                id="confirm-password"
                {...registerPassword('confirmPassword', {
                  minLength: 8,
                })}
                minLength={8}
                type="password"
                className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
              />
            </div>

            <div className="flex flex-col justify-center h-16 my-5">
              <div className="my-10">
                <Button
                  type="submit"
                  text="Bytt passord"
                  className="bg-light"
                />
              </div>
            </div>
          </form>
        </Accordion>
      </div>

      <div className="flex flex-col border rounded-xl border-stone-300 mt-10">
        <Accordion
          label="Statistikk"
          labelClassName="text-xl font-medium text-left pl-2 py-4"
          buttonClassName="bg-neutral-50 shadow-md"
        >
          <div className="px-4 py-4 min-h-[320px] flex flex-col justify-evenly gap-4">
            <div className="">
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
                <Link href={`/events/${event.id}`}>
                  <a className="flex justify-between border rounded-lg py-3 px-6 border-stone-200 bg-stone-200 text-stone-700 text-left text-bold text-sm w-full">
                    <span>{event.title}</span>
                    <span>{`${getLocaleDatetimeString(
                      event.startTime
                    )} - ${getLocaleDatetimeString(event.endTime)}`}</span>
                  </a>
                </Link>
              ))}

            {attendanceCount < (user?.userAttendanceList?.length || 0) ? (
              <div className="flex flex-col justify-center h-16 my-5">
                <div className="my-10">
                  <Button
                    onClick={() => setAttendanceCount((prev) => prev + 5)}
                    type="submit"
                    text="Vis mer"
                    className="border-light border-2"
                    inverted
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Accordion>
      </div>
      <div className="flex flex-col justify-center h-16 my-5">
        <div className="my-10">
          <Button
            onClick={() => signOut().then(() => (window.location.href = '/'))}
            text="Logg ut"
            className="bg-light"
          />
        </div>
      </div>
    </>
  );
};

export default Card;
