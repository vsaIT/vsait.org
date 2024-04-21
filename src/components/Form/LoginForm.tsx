import { Button } from '@/components/Input';
import { MINIMUM_ACTIVITY_TIMEOUT } from '@/lib/constants';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ToastMessage from '../Toast';

type LoginFormValues = {
  csrfToken: string;
  email: string;
  password: string;
};

const LoginForm = () => {
  const [csrfToken, setCsrfToken] = useState<string>();
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormValues>();
  useEffect(() => {
    getCsrfToken().then((res) => {
      if (res) setCsrfToken(res);
    });
  }, []);

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true);
    console.log(csrfToken);
    await signIn('app-login', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (!res) return;
      if (res.ok) {
        window.location.replace('/');
        console.log('Success');
      } else if (res.error) {
        console.error('Server side:', res.error);
        ToastMessage({ type: 'error', message: "Logininfo er feil eller så er epost ikke bekreftet" });
        setTimeout(() => {
          setSubmitting(false);
        }, MINIMUM_ACTIVITY_TIMEOUT);
      }
    });
  };

  return (
    <>
      <div className='mb-10 flex w-128 -translate-y-10 transform flex-col justify-center rounded-2xl bg-white p-8 text-left shadow-2xl'>
        <h1 className='text-gray-900 text-xl font-bold leading-7'>Logg inn:</h1>
        <div className='w-full pt-2'>
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

            <div className='relative my-6'>
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

            <div className='mt-6 flex justify-center space-y-2'>
              <Button
                disabled={isSubmitting}
                onClick={() => console.log('submit')}
                className='w-full'
                type='submit'
              >
                {isSubmitting ? <p>Loading...</p> : <p>Logg inn</p>}
              </Button>
            </div>
          </form>
          <div className='mt-4 flex justify-between'>
            <a href='/forgot' className='text-darker'>
              Glemt passord?
            </a>
            <a href='/register' className='text-darker'>
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
