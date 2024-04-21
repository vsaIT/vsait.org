import { Button } from '@/components/Input';
import { MINIMUM_ACTIVITY_TIMEOUT } from '@/lib/constants';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ToastMessage from '../Toast';

type RegistrationFormValues = {
  csrfToken: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  foodNeeds: string;
  student: string;
};

// TODO: need better error handling for e.g. when password is not the same.
const RegistrationForm = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>();
  const { register, handleSubmit } = useForm<RegistrationFormValues>();
  useEffect(() => {
    getCsrfToken().then((res) => {
      if (res) setCsrfToken(res);
    });
  }, []);

  const onSubmit = async (data: RegistrationFormValues) => {
    setSubmitting(true);
    signIn('app-register', { ...data, redirect: false }).then((res) => {
      if (!res) return;
      if (res.ok) {
        console.log('Success');
        window.location.replace('/confirm-email');
      } else if (res.error) {
        console.error(res.error);
        ToastMessage({ type: 'error', message: res.error });
      }
      setTimeout(() => {
        setSubmitting(false);
      }, MINIMUM_ACTIVITY_TIMEOUT);
    });
  };

  return (
    <>
      <div className='mb-10 flex w-144 -translate-y-10 transform flex-col justify-center rounded-2xl bg-white p-8 text-left shadow-2xl'>
        <h1 className='text-gray-900 text-xl font-bold leading-7'>Register:</h1>
        <div className='w-full pt-8'>
          <form
            className='w-full text-center'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register('csrfToken')}
              type='hidden'
              defaultValue={csrfToken}
              hidden
            />

            <div className='flex gap-5'>
              <div className='relative w-full'>
                <label
                  htmlFor='firstname'
                  className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                >
                  Fornavn
                </label>
                <div className='mt-1'>
                  <input
                    id='firstname'
                    type='text'
                    autoComplete='first-name'
                    placeholder='Fornavn'
                    required
                    {...register('firstName')}
                    className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                  />
                </div>
              </div>

              <div className='relative w-full'>
                <label
                  htmlFor='lastname'
                  className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                >
                  Etternavn
                </label>
                <div className='mt-1'>
                  <input
                    id='lastname'
                    type='text'
                    autoComplete='last-name'
                    placeholder='Etternavn'
                    required
                    {...register('lastName')}
                    className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                  />
                </div>
              </div>
            </div>

            <div className='relative my-6'>
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
                  {...register('email')}
                  className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                />
              </div>
            </div>

            <div className='flex gap-5'>
              <div className='relative w-full'>
                <label
                  htmlFor='password'
                  className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                >
                  Passord
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    type='password'
                    autoComplete='current-password'
                    placeholder='Passord'
                    minLength={8}
                    required
                    {...register('password')}
                    className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                  />
                </div>
              </div>

              <div className='relative w-full'>
                <label
                  htmlFor='repeatPassword'
                  className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
                >
                  Gjenta passord
                </label>
                <div className='mt-1'>
                  <input
                    id='repeatPassword'
                    type='password'
                    autoComplete='repeat-password'
                    placeholder='Gjenta passord'
                    minLength={8}
                    required
                    {...register('repeatPassword')}
                    className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                  />
                </div>
              </div>
            </div>

            <div className='relative my-6'>
              <label
                htmlFor='foodNeeds'
                className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
              >
                Matbehov
              </label>
              <div className='mt-1'>
                <input
                  id='foodNeeds'
                  type='text'
                  autoComplete='allergies'
                  placeholder='Matbehov'
                  {...register('foodNeeds')}
                  className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                />
              </div>
            </div>

            <div className='relative my-6'>
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
                  {...register('student')}
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

            <div className='mt-6 flex justify-center space-y-2'>
              <Button
                disabled={isSubmitting}
                onClick={() => console.log('submit')}
                className='w-full'
                type='submit'
              >
                {isSubmitting ? <p>Loading...</p> : <p>Register</p>}
              </Button>
            </div>
          </form>
          <div className='mt-4 flex justify-center'>
            <a href='/login' className='text-darker'>
              Logg inn
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
