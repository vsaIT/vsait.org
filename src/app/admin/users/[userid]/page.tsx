'use client';
import { Accordion } from '@/components/Accordion';
import DropdownWithCheckboxes from '@/components/DropdownWithCheckboxes';
import { Button } from '@/components/Input';
import SlideCheckbox from '@/components/Input/SlideCheckbox';
import { useMemberships } from '@/lib/hooks/useMemberships';
import { useUser } from '@/lib/hooks/useUser';
import { UserType } from '@/types';
import { bigSmile } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Membership } from '@prisma/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type AdminUsersViewProps = {
  params: { userid: string };
};

function isMembershipInUser(
  mem: Membership,
  userMemberships: Membership[] | undefined
): boolean {
  if (userMemberships) {
    const temp = userMemberships.find((m) => m.year === mem.year);
    return !!temp;
  }
  return false;
}

function AdminUsersView({ params }: AdminUsersViewProps): JSX.Element {
  const { user, isLoading, isError } = useUser(params.userid);
  const { memberships, isLoading: mLoading } = useMemberships();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    if (!isLoading) {
      setEditUser(user);
    }
  }, [isLoading, user]);

  if (isLoading || mLoading) return <div>Loading...</div>;
  const avatar = createAvatar(bigSmile, {
    seed: user?.profileIconSeed,
    radius: 50,
    backgroundColor: ['f5f5f5'],
  });

  const userDataInputs = [
    {
      label: 'Fornavn',
      data: user?.firstName,
      attr: 'firstName',
      disabled: true,
    },
    {
      label: 'Etternavn',
      data: user?.lastName,
      attr: 'lastName',
      disabled: true,
    },
    { label: 'E-post', data: user?.email, attr: 'email', disabled: true },
    {
      label: 'Matbehov',
      data: user?.foodNeeds,
      attr: 'foodNeeds',
      disabled: false,
    },
  ];
  return (
    <div className='flex h-screen w-full flex-col gap-6 p-6'>
      <div className='flex w-full justify-between gap-6 rounded-xl bg-white p-6'>
        <div className='flex flex-col items-center'>
          <h1 className='text-xl font-medium'>Endre brukeren</h1>
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
                      defaultValue={inputFieldData.data}
                      onChange={(e) => {
                        if (editUser) {
                          setEditUser({
                            ...editUser,
                            [inputFieldData.attr]: e.target.value,
                          });
                        }
                      }}
                      required={
                        inputFieldData.label.toLowerCase() !== 'matbehov'
                      }
                      disabled={inputFieldData.disabled}
                      className={`w-full cursor-text rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out ${inputFieldData.disabled ? 'text-stone-500' : ''}`}
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
                    defaultValue={user?.student ? user.student : ''}
                    onChange={(e) => {
                      if (editUser)
                        setEditUser({ ...editUser, student: e.target.value });
                    }}
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
                <DropdownWithCheckboxes
                  label='Velg år'
                  initialItems={
                    memberships
                      ? memberships.map((membership) => ({
                        value: membership.year,
                        checked: isMembershipInUser(
                          membership,
                          user?.membership
                        ),
                      }))
                      : []
                  }
                  onChange={(memberships) => {
                    if (editUser) {
                      setEditUser({ ...editUser, membership: memberships });
                    }
                  }}
                />
              </div>
              {/* Pending membership */}
              <div className='flex flex-col'>
                <p>Avventende medlemskap</p>
                <SlideCheckbox
                  id='pending-membership'
                  label='Avventende medlemskap'
                  checked={true}
                  onChange={() => { true }}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-between rounded-xl border border-stone-300 p-6 sm:w-1/2'>
            <div>
              <div className='flex flex-col'>
                <p>E-postbekreftelse</p>
                {/* Checkbox */}
                <SlideCheckbox
                  id='email-confirmation'
                  label='Ikke bekreftet/Bekreftet'
                  checked={editUser?.emailVerified ? true : false}
                  onChange={() => {
                    if (editUser) {
                      setEditUser({ ...editUser, emailVerified: !editUser.emailVerified });
                    }
                  }}
                />

                {/* Email confirmation URL */}
                <p>E-postbekreftelses URL:</p>
                <input
                  id='email-confirm'
                  type='text'
                  placeholder='E-postbekreftelses URL'
                  defaultValue={editUser?.emailVerificationUrl}
                  disabled={true}
                  className='my-5 w-full cursor-text rounded-xl border-2 border-stone-300 bg-transparent p-1 py-3 text-left text-sm leading-6 text-stone-500 outline-none transition duration-150 ease-in-out'
                />
                {/* Checkbox */}
                <div>Rolle</div>
                <SlideCheckbox
                  id='admin-status'
                  label='Administrator'
                  checked={editUser?.role === 'ADMIN'}
                  onChange={() => {
                    if (editUser) {
                      setEditUser({ ...editUser, role: editUser.role === 'ADMIN' ? 'USER' : 'ADMIN' });
                    }
                  }} />
              </div>
              {/* Accordion for changing password */}
              <Accordion
                label='Endre passord'
                labelClassName='text-l font-medium text-left pl-2 py-4'
                buttonClassName='bg-neutral-50 shadow-md'
                onClick={() => setChangePasswordOpen(!changePasswordOpen)}
                className=''
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
            <div className='mb-4 flex w-full space-x-10'>
              <Button
                type='submit'
                text='Lagre endringer'
                className='bg-light'
                onClick={() => {
                  console.log(editUser);
                }}
              />
              <Button type='submit' text='Slett bruker' className='bg-light' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersView;
