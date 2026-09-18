import { MINIMUM_ACTIVITY_TIMEOUT } from '@/lib/constants';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { swalSuccess } from '@/lib/swal';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Envelope, Eye, EyeSlash, Lock } from '@/components/icons';
import { Checkbox } from '@/components/Input';

type LoginFormValues = {
  csrfToken: string;
  email: string;
  password: string;
  remember: boolean;
};

const REMEMBER_KEY = 'vsait.remember';
const REMEMBERED_EMAIL_KEY = 'vsait.rememberedEmail';

const LoginForm = () => {
  const [csrfToken, setCsrfToken] = useState<string>();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, setValue } = useForm<LoginFormValues>({
    defaultValues: { remember: true },
  });
  useEffect(() => {
    getCsrfToken().then((res) => {
      if (res) setCsrfToken(res);
    });
  }, []);

  // Restore the choice from the previous login
  useEffect(() => {
    try {
      const remember = window.localStorage.getItem(REMEMBER_KEY);
      const rememberedEmail = window.localStorage.getItem(REMEMBERED_EMAIL_KEY);
      if (remember !== null) setValue('remember', remember === 'true');
      if (rememberedEmail) setValue('email', rememberedEmail);
    } catch (e) {
      console.error('Error reading remember me preference:', e);
    }
  }, [setValue]);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('registered')) {
        swalSuccess('Sjekk e-posten din for å bekrefte kontoen!');
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, '', cleanUrl);
      }
    } catch (e) {
      console.error('Error parsing URL parameters:', e);
    }
  }, []);

  // Store the "remember me" choice in localStorage and update the session lifetime on the server
  const applyRememberChoice = async (data: LoginFormValues) => {
    try {
      window.localStorage.setItem(REMEMBER_KEY, String(data.remember));
      if (data.remember)
        window.localStorage.setItem(REMEMBERED_EMAIL_KEY, data.email);
      else window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    } catch (e) {
      console.error('Error storing remember me preference:', e);
    }

    try {
      await fetch('/api/auth/remember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remember: data.remember }),
      });
    } catch (e) {
      console.error('Error updating session lifetime:', e);
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    console.log(csrfToken);
    await signIn('app-login', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then(async (res) => {
      if (!res) return;
      if (res.ok) {
        await applyRememberChoice(data);
        window.location.replace('/');
        console.log('Success');
      } else if (res.error) {
        console.error('Server side:', res.error);
        setError(res.error);
        setTimeout(() => {
          setSubmitting(false);
        }, MINIMUM_ACTIVITY_TIMEOUT);
      }
    });
  };

  const labelClass =
    'block text-left text-[0.7rem] uppercase tracking-[0.14em] text-gray/70';
  const inputClass =
    'w-full rounded-xl border border-primary/20 bg-white py-3 pl-11 pr-4 text-left text-sm  shadow-sm outline-none transition-all duration-300 placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/20';

  return (
    <div className='flex w-full max-w-sm flex-col text-left'>
      <div className='flex rounded-full bg-white p-1 shadow-sm'>
        <span className='flex-1 rounded-full bg-primary py-2.5 text-center text-sm text-white shadow-sm'>
          Logg inn
        </span>
        <Link
          href='/register'
          className='flex-1 rounded-full py-2.5 text-center text-sm text-gray transition-all duration-300 hover:text-primary'
        >
          Register
        </Link>
      </div>

      <h1 className='mt-8 text-3xl leading-snug '>
        Velkommen tilbake
      </h1>
      <p className='mt-2 text-sm text-gray'>
        Logg inn for å se arrangementene og medlemskapet ditt.
      </p>

      <form className='mt-6 w-full' onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('csrfToken')}
          type='hidden'
          defaultValue={csrfToken}
          hidden
        />

        {error && (
          <div className='mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-left text-sm text-red-800 shadow-sm'>
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
            <p>{error}</p>
          </div>
        )}

        <label htmlFor='email' className={labelClass}>
          E-post
        </label>
        <div className='relative mt-2'>
          <Envelope
            color='#D5564D'
            className='pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2'
          />
          <input
            id='email'
            type='email'
            autoComplete='email'
            placeholder='din@epost.no'
            required
            {...register('email')}
            className={inputClass}
          />
        </div>

        <label htmlFor='password' className={`${labelClass} mt-5`}>
          Passord
        </label>
        <div className='relative mt-2'>
          <Lock
            color='#D5564D'
            className='pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2'
          />
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            autoComplete='current-password'
            placeholder='••••••••'
            minLength={8}
            required
            {...register('password')}
            className={`${inputClass} pr-11`}
          />
          <button
            type='button'
            onClick={() => setShowPassword((prevState) => !prevState)}
            aria-label={showPassword ? 'Skjul passord' : 'Vis passord'}
            className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition-all duration-300 hover:bg-primary/10'
          >
            {showPassword ? (
              <EyeSlash color='#9ca3af' className='h-4 w-4' />
            ) : (
              <Eye color='#9ca3af' className='h-4 w-4' />
            )}
          </button>
        </div>

        <div className='mt-4 flex items-center justify-between text-sm'>
          <label
            htmlFor='remember'
            className='flex cursor-pointer items-center gap-2 text-gray'
          >
            <Checkbox id='remember' defaultChecked {...register('remember')} />
            Husk meg
          </label>
          <Link
            href='/forgot'
            className='text-primary transition-all duration-300 hover:brightness-90'
          >
            Glemt passord?
          </Link>
        </div>

        <button
          disabled={isSubmitting}
          type='submit'
          className='mt-6 w-full rounded-full bg-primary py-3.5 text-sm text-white shadow-md transition-all duration-300 hover:brightness-90 disabled:brightness-95'
        >
          {isSubmitting ? 'Laster ...' : 'Logg inn  →'}
        </button>
      </form>

      <div className='my-6 flex items-center gap-4 text-xs text-gray/60'>
        <span className='h-px flex-1 bg-primary/15' />
        eller
        <span className='h-px flex-1 bg-primary/15' />
      </div>

      <p className='text-center text-sm text-gray'>
        Ikke medlem ennå?{' '}
        <Link
          href='/register'
          className='text-primary transition-all duration-300 hover:brightness-90'
        >
          Registrer deg
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
