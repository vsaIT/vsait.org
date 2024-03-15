'use client';
import { Accordion } from '@/components/Accordion';
import { Button, IndeterminateCheckbox } from '@/components/Input';
import SlideCheckbox from '@/components/Input/SlideCheckbox';
import { useUser } from '@/lib/hooks/useUser';
import { bigSmile } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { profileIconAtom, userAtom } from '@/lib/atoms';
import { generateSalt } from '@/lib/auth/passwords';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useAtom } from 'jotai';
import Image from 'next/image';

type AdminUsersViewProps = {
  params: { userid: string };
};

function AdminUsersView({ params }: AdminUsersViewProps): JSX.Element {
  const { user, isLoading, isError } = useUser(params.userid);
  if (isLoading) return <div>Loading...</div>;

  const avatar = createAvatar(bigSmile, {
    seed: user?.profileIconSeed,
    radius: 50,
    backgroundColor: ['f5f5f5'],
  });

  const userDataInputs = [
    { label: 'Fornavn', data: user?.firstName },
    { label: 'Etternavn', data: user?.lastName },
    { label: 'E-post', data: user?.email },
    { label: 'Matbehov', data: user?.foodNeeds },
  ];

  return (
    <div className='flex h-screen w-full flex-col gap-6 p-6'>
      <div className='flex w-full justify-between gap-6 rounded-xl bg-white p-6'>
        <div className='flex flex-col'>
          <h1 className='text-xl font-medium'>Brukere</h1>
          <p className='text-sm'>Endre brukeren</p>
        </div>

        <div className='flex items-center justify-center rounded-full'>
          <div className='relative h-20 w-20'>
            <Image
              id='modal-icon'
              src={avatar.toDataUriSync()}
              alt='Profile icon'
              fill
            />
          </div>
        </div>
      </div>
      <div className='w-full rounded-xl bg-white p-6'>
        <div className='flex w-full flex-col gap-3 sm:flex-row'>
          <div className='rounded-xl border border-stone-300 sm:w-1/2'>
            <div className='flex flex-col gap-5 p-6'>
              <p>Brukerinformasjon</p>
              {/* Input fields */}
              {userDataInputs.map((inputFieldData, index) => (
                <div key={index} className='relative w-full'>
                  <label
                    htmlFor={inputFieldData.label.toLowerCase()}
                    className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                  >
                    {inputFieldData.label}
                  </label>
                  <div className='mt-1'>
                    <input
                      id={inputFieldData.label.toLowerCase()}
                      type={
                        inputFieldData.label.toLowerCase() === 'e-post'
                          ? 'email'
                          : 'text'
                      }
                      autoComplete={inputFieldData.label
                        .toLowerCase()
                        .replace('-', '')}
                      placeholder={inputFieldData.label}
                      value={inputFieldData.data as string}
                      required
                      className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                    />
                  </div>
                </div>
              ))}
              {/* Select field */}
              <div className='relative'>
                <label
                  htmlFor='student'
                  className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                >
                  Student
                </label>
                <div className='mt-1'>
                  <select
                    id='student'
                    required
                    className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out invalid:text-placeholder'
                    defaultValue=''
                  >
                    <option value='' disabled hidden>
                      Velg student informasjon
                    </option>
                    <option value='NTNU'>
                      Norges teknisk-naturvitenskapelige universitet
                    </option>
                    <option value='BI'>Handelshøyskolen BI</option>
                    <option value='DMMH'>Dronning Mauds Minne Høgskole</option>
                    <option value='Other'>Andre</option>
                    <option value='Non-student'>Ikke student</option>
                  </select>
                </div>
              </div>
              {/* Membership information */}
              <div className='flex flex-col gap-2'>
                <p>Medlemskap informasjon</p>
                <div className='flex gap-4'>
                  <div className='rounded-2xl bg-neutral-100 px-6 py-2'>
                    2021
                  </div>
                </div>
              </div>
              {/* Pending membership */}
              <div className='flex flex-col'>
                <p>Avventende medlemskap</p>
                <SlideCheckbox
                  id='pending-membership'
                  label='Avventende medlemskap'
                />
              </div>
            </div>
          </div>
          {/* Email confirmation */}
          <div className='rounded-xl border border-stone-300 p-6 sm:w-1/2'>
            <div className='flex flex-col'>
              <p>E-postbekreftelse</p>
              {/* Checkbox */}
              <SlideCheckbox
                id='email-confirmation'
                label='Ikke bekreftet/Bekreftet'
              />

              {/* Email confirmation URL */}
              <div className='relative w-full'>
                <label
                  htmlFor='email-confirm'
                  className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                >
                  E-postbekreftelses URL
                </label>
                <div className='mt-1'>
                  <input
                    id='email-confirm'
                    type='text'
                    className='w-full rounded-xl border-2 border-stone-300 bg-transparent p-1 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                  />
                </div>
              </div>

              {/* Checkbox */}
              <div>Rolle</div>
              <SlideCheckbox id='admin-status' label='Administrator' />
            </div>
            {/* Accordion for changing password */}
            <Accordion
              label='Endre passord'
              labelClassName='text-xl font-medium text-left pl-2 py-4'
              buttonClassName='bg-neutral-50 shadow-md'
            >
              <form className='px-4 py-4 sm:mx-28 sm:my-10'>
                <div className='sm:mx-5'>
                  <label
                    htmlFor='new-password'
                    className='relative left-4 top-3 block w-fit bg-white px-2 text-left text-sm font-medium text-stone-500'
                  >
                    Nytt passord*
                  </label>
                  <input
                    id='new-password'
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
        </div>
      </div>
    </div>
  );
}

export default AdminUsersView;
