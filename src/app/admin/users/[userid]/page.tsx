'use client';
import { Accordion } from '@/components/Accordion';
import DropdownWithCheckboxes from '@/components/DropdownWithCheckboxes';
import { FormInput, SelectField } from '@/components/Form';
import { Button } from '@/components/Input';
import SlideCheckbox from '@/components/Input/SlideCheckbox';
import StyledSwal from '@/components/StyledSwal';
import { useMemberships } from '@/lib/hooks/useMemberships';
import { useUser } from '@/lib/hooks/useUser';
import { swalError, swalSuccess } from '@/lib/swal';
import { deleteFetcher, postFetcher, putFetcher } from '@/lib/utils';
import { UserType } from '@/types';
import { bigSmile } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Membership } from '@prisma/client';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type AdminUsersViewProps = {
  params: { userid: string };
};

type PasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
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

const studentOptions = [
  {
    value: 'NTNU',
    label: 'Norges teknisk-naturvitenskapelige universitet',
  },
  { value: 'BI', label: 'Handelshøyskolen BI' },
  { value: 'DMMH', label: 'Dronning Mauds Minne Høgskole' },
  { value: 'Other', label: 'Andre' },
  { value: 'Non-student', label: 'Ikke student' },
];

function AdminUsersView({ params }: AdminUsersViewProps): JSX.Element {
  const { user, isLoading } = useUser(params.userid);
  const { memberships, isLoading: mLoading } = useMemberships();
  const [editUser, setEditUser] = useState<UserType | undefined>(undefined);
  const { register, reset, handleSubmit } = useForm<PasswordFormValues>();

  const updateUserPassword = useCallback(
    (data: PasswordFormValues) => {
      StyledSwal.fire({
        text: '',
        showConfirmButton: true,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonText: 'Lagre',
        cancelButtonText: 'Avbryt',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            if (data.newPassword !== data.confirmPassword)
              throw new Error('Passordene er ikke like');
            await postFetcher(`/api/user/${params.userid}/password`, {
              newPassword: data.newPassword,
              confirmPassword: data.confirmPassword,
            });
            swalSuccess('Passordet ble oppdatert');
            reset();
          } catch (error) {
            swalError(
              'Passordet ble ikke oppdatert',
              error as Error,
              5000,
              true
            );
          }
        }
      });
    },
    [params.userid]
  );

  const updateUser = useCallback(
    (putUser: UserType | undefined) => {
      StyledSwal.fire({
        text: '',
        showConfirmButton: false,
        showLoaderOnConfirm: true,
        didOpen: () => {
          StyledSwal.getConfirmButton()?.click();
        },
        preConfirm: async () => {
          try {
            if (!putUser) throw new Error('No user data');
            const response = await putFetcher<UserType>(
              `/api/user/${params.userid}`,
              putUser
            );
            setEditUser(response);
            swalSuccess('Brukeren ble oppdatert');
          } catch (error) {
            swalError(
              'Brukeren ble ikke oppdatert',
              error as Error,
              5000,
              true
            );
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    },
    [params.userid]
  );

  const deleteUser = useCallback(
    (delUser: UserType | undefined) => {
      StyledSwal.fire({
        title: 'Er du sikker?',
        text: 'Denne brukeren vil bli permanent slettet',
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Slett bruker',
        showCancelButton: true,
        cancelButtonText: 'Angre',
        showLoaderOnConfirm: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            if (!delUser) throw new Error('No user data');
            const response = await deleteFetcher(
              `/api/user/${params.userid}`,
              delUser
            );
            swalSuccess('Brukeren ble slettet');
          } catch (error) {
            swalError(
              'Brukeren ble ikke slettet',
              error as Error,
              5000,
              true
            );
            StyledSwal.fire({
              title: "Slettet bruker",
              text: "Brukeren er permanent slettet",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          StyledSwal.fire({
            title: "Angret",
            text: "Brukeren ble ikke slettet",
          });
        };
      });
    },
    [params.userid]
  );

  useEffect(() => {
    if (!isLoading) {
      setEditUser(user);
    }
  }, [isLoading, user]);

  if (isLoading || mLoading) return <div>Loading...</div>;

  function handleChange<T>(attr: string, value: T) {
    if (editUser) {
      setEditUser({
        ...editUser,
        [attr]: value,
      });
    }
  }

  const avatar = createAvatar(bigSmile, {
    seed: user?.profileIconSeed,
    radius: 50,
    backgroundColor: ['f5f5f5'],
  });

  const userDataInputs = [
    {
      label: 'Fornavn',
      defaultValue: user?.firstName,
      attr: 'firstName',
      type: 'text',
      disabled: true,
    },
    {
      label: 'Etternavn',
      defaultValue: user?.lastName,
      attr: 'lastName',
      type: 'text',
      disabled: true,
    },
    {
      label: 'E-post',
      defaultValue: user?.email,
      attr: 'email',
      type: 'email',
      disabled: true,
    },
    {
      label: 'Matbehov',
      defaultValue: user?.foodNeeds,
      attr: 'foodNeeds',
      type: 'text',
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
              <h2>Brukerinformasjon</h2>
              {userDataInputs.map((inputFieldData, index) => (
                <FormInput
                  key={index.toString()}
                  {...inputFieldData}
                  onChange={(e) =>
                    handleChange(inputFieldData.attr, e.target.value)
                  }
                />
              ))}

              <SelectField
                label='Student'
                name='student'
                defaultValue={user?.student ? user.student : 'Non-student'}
                options={studentOptions}
                onChange={(e) => handleChange('student', e.target.value)}
              />
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
                  onChange={(memberships) =>
                    handleChange('membership', memberships)
                  }
                />
              </div>
              <div className='flex flex-col'>
                <p>Avventende medlemskap</p>
                <SlideCheckbox
                  id='pending-membership'
                  label='Avventende medlemskap'
                  checked={editUser?.pendingMembership ? true : false}
                  onChange={() =>
                    handleChange(
                      'pendingMembership',
                      !editUser?.pendingMembership
                    )
                  }
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
                  onChange={() =>
                    handleChange('emailVerified', !editUser?.emailVerified)
                  }
                />
                <h2>E-postbekreftelses URL:</h2>
                <FormInput
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
                  onChange={() =>
                    handleChange(
                      'role',
                      editUser?.role === 'ADMIN' ? 'USER' : 'ADMIN'
                    )
                  }
                />
              </div>
              <Accordion
                label='Endre passord'
                labelClassName='text-l font-medium text-left pl-2 py-4'
                buttonClassName='bg-neutral-50 shadow-md'
                className='mb-5'
              >
                <form
                  id='password-form'
                  className='flex-col space-y-8 px-4 py-4 sm:mx-28 sm:my-10'
                  onSubmit={handleSubmit(updateUserPassword)}
                >
                  <FormInput
                    id='new-password'
                    formRegisterReturn={register('newPassword')}
                    label='Nytt passord*'
                    type='password'
                    required
                    className=':invalid-border-red'
                  />

                  <FormInput
                    id='confirm-password'
                    formRegisterReturn={register('confirmPassword')}
                    label='Bekreft nytt passord*'
                    type='password'
                    required
                    className=':invalid-border-red'
                  />

                  <div className='my-10 flex justify-start'>
                    <Button
                      type='submit'
                      form='password-form'
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
                form='user-form'
                text='Lagre endringer'
                className='bg-light'
                onClick={() => updateUser(editUser)}
              />
              <Button
                type='submit'
                form='user-form'
                text='Slett bruker'
                className='bg-light'
                onClick={() => deleteUser(editUser)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersView;
