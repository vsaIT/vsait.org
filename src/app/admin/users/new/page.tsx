'use client';
import DropdownWithCheckboxes from '@/components/DropdownWithCheckboxes';
import { FormInput, SelectField } from '@/components/Form';
import FormErrorBox from '@/components/Form/FormErrorBox';
import { Button } from '@/components/Input';
import SlideCheckbox from '@/components/Input/SlideCheckbox';
import LoadingIndicator from '@/components/LoadingIndicator';
import { generateSalt } from '@/lib/auth/passwords';
import { studentOptions } from '@/lib/constants';
import { useMemberships } from '@/lib/hooks/useMemberships';
import { swalError, swalSuccess } from '@/lib/swal';
import { postFetcher } from '@/lib/utils';
import { UserType } from '@/types';
import { bigSmile } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function NewUserPage(): JSX.Element {
  const { memberships, isLoading: mLoading } = useMemberships();
  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<UserType>();
  const [isAvatarHover, setAvatarHover] = useState(false);
  const router = useRouter();

  const watchIsAdmin = watch('role', 'USER');
  const watchPendingMembership = watch('pendingMembership', false);
  const watchEmailVerified = watch('emailVerified', false);
  const watchProfileIconSeed = watch('profileIconSeed', '');

  const onSubmit = useCallback(
    async (user: UserType) => {
      try {
        const response = await postFetcher<UserType>('/api/user', user);
        await swalSuccess('Bruker opprettet!');
        reset();
        router.replace(`${response.id}`);
      } catch (error) {
        swalError('Kunne ikke opprette bruker', error as Error);
      }
    },
    [reset, router]
  );

  const avatar = createAvatar(bigSmile, {
    seed: watchProfileIconSeed,
    radius: 50,
    backgroundColor: ['f5f5f5'],
  });

  const basicUserDataInputs: Array<{
    label: string;
    attr: keyof UserType;
    type: string;
    required: boolean;
  }> = [
    {
      label: 'Fornavn',
      attr: 'firstName',
      type: 'text',
      required: true,
    },
    {
      label: 'Etternavn',
      attr: 'lastName',
      type: 'text',
      required: true,
    },
    {
      label: 'E-post',
      attr: 'email',
      type: 'email',
      required: true,
    },
    {
      label: 'Matbehov',
      attr: 'foodNeeds',
      type: 'text',
      required: false,
    },
  ];

  return (
    <div className='flex h-screen w-full flex-col gap-6 p-6'>
      <div className='flex w-full justify-between gap-6 rounded-xl bg-white p-6'>
        <div className='flex flex-col items-center'>
          <h1 className='text-xl font-medium'>Registrer ny bruker</h1>
        </div>
        <div
          className='relative flex items-center justify-center rounded-full'
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
        >
          <div className='relative h-20 w-20'>
            <Image
              id='modal-icon'
              src={avatar.toDataUriSync()}
              alt='Profile icon'
              fill
            />
            {isAvatarHover && (
              <button
                className='absolute inset-0 flex items-center justify-center rounded-full bg-gray bg-opacity-30 text-white'
                onClick={() => setValue('profileIconSeed', generateSalt(24))}
                title='Reroll Avatar'
              >
                ↻
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col gap-6'>
        <FormErrorBox errors={errors} />
      </div>
      <form
        className='w-full rounded-xl bg-white p-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex w-full flex-col gap-3 sm:flex-row'>
          <div className='rounded-xl border border-stone-300 sm:w-1/2'>
            <div className='flex flex-col gap-5 p-6'>
              <h2>Brukerinformasjon</h2>
              {basicUserDataInputs.map((inputFieldData, index) => (
                <FormInput
                  key={index.toString()}
                  {...inputFieldData}
                  {...register(inputFieldData.attr, {
                    required: inputFieldData.required,
                  })}
                />
              ))}
              <SelectField
                label='Student'
                name='student'
                options={studentOptions}
                defaultValue={'Non-student'}
                onChange={(e) => setValue('student', e.target.value)}
              />
              <div className='flex flex-col gap-2'>
                <p>Medlemskap informasjon</p>
                {!mLoading ? (
                  <DropdownWithCheckboxes
                    label='Velg år'
                    initialItems={
                      memberships
                        ? memberships.map((membership) => ({
                            value: membership.year,
                            checked: false,
                          }))
                        : []
                    }
                    onChange={(m) => setValue('membership', m)}
                  />
                ) : (
                  <LoadingIndicator />
                )}
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
                  checked={watchEmailVerified}
                  onChange={() =>
                    setValue('emailVerified', !watchEmailVerified)
                  }
                />
                <div className='flex flex-col'>
                  <h2>Avventende medlemskap</h2>
                  <SlideCheckbox
                    id='pending-membership'
                    label='Avventende medlemskap'
                    checked={watchPendingMembership}
                    onChange={() =>
                      setValue('pendingMembership', !watchPendingMembership)
                    }
                  />
                </div>
                <h2>Rolle</h2>
                <SlideCheckbox
                  id='admin-status'
                  label='Administrator'
                  checked={watchIsAdmin == 'ADMIN'}
                  onChange={() =>
                    setValue('role', watchIsAdmin == 'ADMIN' ? 'USER' : 'ADMIN')
                  }
                />
              </div>
              <FormInput
                id='password'
                label='Passord'
                type='password'
                required
                className=':invalid-border-red'
                {...register('password', { required: true })}
              />
            </div>
            <div className='my-4 flex w-full flex-col justify-start space-x-0 space-y-4 lg:flex-row lg:space-x-10 lg:space-y-0'>
              <Button
                type='submit'
                text='Registrer bruker'
                className='bg-light'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
