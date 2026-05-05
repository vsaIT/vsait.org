import { Button } from '@/components/Input';
import { MINIMUM_ACTIVITY_TIMEOUT } from '@/lib/constants';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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

const RegistrationForm = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<RegistrationFormValues>();
  useEffect(() => {
    getCsrfToken().then((res) => {
      if (res) setCsrfToken(res);
    });
  }, []);

  const onSubmit = async (data: RegistrationFormValues) => {
    setError(null);
    if (data.password !== data.repeatPassword) {
      setError('Passordene er ikke like.');
      return;
    }

    setSubmitting(true);
    signIn('app-register', { ...data, redirect: false }).then((res) => {
      if (!res) return;
      if (res.ok) {
        console.log('Success');
        window.location.replace('/login?registered=1');
      } else if (res.error) {
        if (
          res.error === 'CredentialsSignin' ||
          res.error === 'RegistrationSuccessful'
        ) {
          console.log('Registration succeeded implicitly');
          window.location.replace('/login?registered=1');
          return;
        }
        console.error(res.error);
        setError(res.error);
      }
      setTimeout(() => {
        setSubmitting(false);
      }, MINIMUM_ACTIVITY_TIMEOUT);
    });
  };

  return (
    <>
      <div className='mb-10 flex w-[calc(100%-1rem)] max-w-xl -translate-y-10 transform flex-col justify-center rounded-2xl bg-white p-4 text-left shadow-2xl sm:p-8'>
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

            {error && (
              <div className='mb-6 flex items-center gap-3 rounded-lg border border-red-500 bg-red-50 p-4 text-left text-sm text-red-800 shadow-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-6 w-6 shrink-0 text-red-500'
                >
                  <path
                    fillRule='evenodd'
                    d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
                    clipRule='evenodd'
                  />
                </svg>
                <p className='font-medium'>{error}</p>
              </div>
            )}

            <div className='flex flex-col gap-5 sm:flex-row'>
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

            <div className='flex flex-col gap-5 sm:flex-row'>
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
                  className='w-full rounded-xl border-2 border-stone-300 bg-transparent py-3 pl-4 pr-10 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out invalid:text-placeholder'
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
