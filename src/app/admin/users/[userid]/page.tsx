'use client';
import { Accordion } from '@/components/Accordion';
import DropdownWithCheckboxes from '@/components/DropdownWithCheckboxes';
import { Input, SelectField } from '@/components/Form';
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
          <div className='relative mr-8 h-20 w-20'>
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
                <Input
                  id={index.toString()}
                  label={inputFieldData.label}
                  type={
                    inputFieldData.label.toLowerCase() === 'e-post'
                      ? 'email'
                      : 'text'
                  }
                  defaultValue={inputFieldData.data}
                  onChange={(e) => {
                    if (editUser)
                      setEditUser({
                        ...editUser,
                        [inputFieldData.attr]: e.target.value,
                      });
                  }}
                  required={inputFieldData.label.toLowerCase() !== 'matbehov'}
                  disabled={inputFieldData.disabled}
                />
              ))}

              <SelectField
                label='Student'
                name='student'
                defaultValue={user?.student ? user.student : ''}
                options={[
                  {
                    value: 'NTNU',
                    label: 'Norges teknisk-naturvitenskapelige universitet',
                  },
                  { value: 'BI', label: 'Handelshøyskolen BI' },
                  { value: 'DMMH', label: 'Dronning Mauds Minne Høgskole' },
                  { value: 'Other', label: 'Andre' },
                  { value: 'Non-student', label: 'Ikke student' },
                ]}
                onChange={(e) => {
                  if (editUser)
                    setEditUser({ ...editUser, student: e.target.value });
                }}
              />

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
                  checked={editUser?.pendingMembership ? true : false}
                  onChange={() => {
                    if (editUser) {
                      setEditUser({
                        ...editUser,
                        pendingMembership: !editUser.pendingMembership,
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-between rounded-xl border border-stone-300 p-6 sm:w-1/2'>
            <div>
              <div className='flex flex-col'>
                <h2>E-postbekreftelse</h2>
                <SlideCheckbox
                  id='email-confirmation'
                  label='Ikke bekreftet/Bekreftet'
                  checked={editUser?.emailVerified ? true : false}
                  onChange={() => {
                    if (editUser) {
                      setEditUser({
                        ...editUser,
                        emailVerified: !editUser.emailVerified,
                      });
                    }
                  }}
                />

                {/* Email confirmation URL */}
                <h2>E-postbekreftelses URL:</h2>
                <Input
                  id='email-confirm'
                  label='E-postbekreftelses URL'
                  type='text'
                  defaultValue={editUser?.emailVerificationUrl}
                  showLabel={false}
                  disabled
                  className='my-5'
                />

                <h2>Rolle</h2>
                <SlideCheckbox
                  id='admin-status'
                  label='Administrator'
                  checked={editUser?.role === 'ADMIN'}
                  onChange={() => {
                    if (editUser) {
                      setEditUser({
                        ...editUser,
                        role: editUser.role === 'ADMIN' ? 'USER' : 'ADMIN',
                      });
                    }
                  }}
                />
              </div>
              {/* Accordion for changing password */}
              <Accordion
                label='Endre passord'
                labelClassName='text-l font-medium text-left pl-2 py-4'
                buttonClassName='bg-neutral-50 shadow-md'
                onClick={() => setChangePasswordOpen(!changePasswordOpen)}
                className='mb-5'
              >
                <form className='flex-col space-y-8 px-4 py-4 sm:mx-28 sm:my-10'>
                  <Input
                    id='new-password'
                    minLength={8}
                    label='Nytt passord*'
                    type='password'
                    required
                  />

                  <Input
                    id='confirm-password'
                    minLength={8}
                    label='Bekreft nytt passord*'
                    type='password'
                    required
                  />

                  <div className='my-10 flex justify-start'>
                    <Button
                      type='submit'
                      text='Bytt passord'
                      className='bg-light'
                    />
                  </div>
                </form>
              </Accordion>
            </div>
            <div className='my-4 flex w-full flex-col justify-start space-x-0 space-y-4 lg:flex-row lg:space-x-10 lg:space-y-0'>
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
