import { MINIMUM_ACTIVITY_TIMEOUT } from '@/lib/constants';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import {
  Envelope,
  Eye,
  EyeSlash,
  GraduationCap,
  Lock,
  Person,
  Utensils,
} from '@/components/icons';
import { Checkbox } from '@/components/Input';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@/lib/auth/passwordRules';

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
  const [showPassword, setShowPassword] = useState(false);
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

  const labelClass =
    'block text-left text-[1rem] uppercase tracking-[0.15em] text-gray/70';
  const inputClass =
    'w-full rounded-xl border border-primary/20 bg-white py-3 pl-11 pr-4 text-left text-sm  shadow-sm outline-none transition-all duration-300 placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/20';
  const iconClass =
    'pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2';

  return (
    <div className='flex w-full max-w-sm flex-col text-left'>
      <div className='flex rounded-full bg-white p-1 shadow-sm'>
        <Link
          href='/login'
          className='flex-1 rounded-full py-2.5 text-center text-sm text-gray transition-all duration-300 hover:text-primary'
        >
          Logg inn
        </Link>
        <span className='flex-1 rounded-full bg-primary py-2.5 text-center text-sm text-white shadow-sm'>
          Register
        </span>
      </div>

      <h1 className='mt-8 text-3xl leading-snug '>Registrer deg</h1>
      <p className='mt-2 text-sm text-gray'>
        Fyll ut skjemaet for å opprette en konto hos VSAiT.
      </p>

      <form className='mt-6 w-full' onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('csrfToken')}
          type='hidden'
          defaultValue={csrfToken}
          hidden
        />

        {error && (
          <div className='mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-left text-sm text-primary shadow-sm'>
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

        <div className='flex flex-col gap-4 sm:flex-row'>
          <div className='w-full'>
            <label htmlFor='firstname' className={labelClass}>
              Fornavn
            </label>
            <div className='relative mt-2'>
              <Person color='#D5564D' className={iconClass} />
              <input
                id='firstname'
                type='text'
                autoComplete='given-name'
                placeholder='Fornavn'
                required
                {...register('firstName')}
                className={inputClass}
              />
            </div>
          </div>

          <div className='w-full'>
            <label htmlFor='lastname' className={labelClass}>
              Etternavn
            </label>
            <div className='relative mt-2'>
              <Person color='#D5564D' className={iconClass} />
              <input
                id='lastname'
                type='text'
                autoComplete='family-name'
                placeholder='Etternavn'
                required
                {...register('lastName')}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <label htmlFor='email' className={`${labelClass} mt-5`}>
          E-post
        </label>
        <div className='relative mt-2'>
          <Envelope color='#D5564D' className={iconClass} />
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

        <div className='mt-5 flex flex-col gap-4 sm:flex-row'>
          <div className='w-full'>
            <label htmlFor='password' className={labelClass}>
              Passord
            </label>
            <div className='relative mt-2'>
              <Lock color='#D5564D' className={iconClass} />
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                autoComplete='new-password'
                placeholder='••••••••'
                minLength={PASSWORD_MIN_LENGTH}
                maxLength={PASSWORD_MAX_LENGTH}
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
          </div>

          <div className='w-full'>
            <label htmlFor='repeatPassword' className={labelClass}>
              Gjenta passord
            </label>
            <div className='relative mt-2'>
              <Lock color='#D5564D' className={iconClass} />
              <input
                id='repeatPassword'
                type={showPassword ? 'text' : 'password'}
                autoComplete='new-password'
                placeholder='••••••••'
                minLength={PASSWORD_MIN_LENGTH}
                maxLength={PASSWORD_MAX_LENGTH}
                required
                {...register('repeatPassword')}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <label htmlFor='foodNeeds' className={`${labelClass} mt-5`}>
          Matbehov
        </label>
        <div className='relative mt-2'>
          <Utensils color='#D5564D' className={iconClass} />
          <input
            id='foodNeeds'
            type='text'
            autoComplete='allergies'
            placeholder='F.eks. vegetar, nøtteallergi — eller la stå tomt'
            {...register('foodNeeds')}
            className={inputClass}
          />
        </div>

        <label htmlFor='student' className={`${labelClass} mt-5`}>
          Utdanningsinstitusjon
        </label>
        <div className='relative mt-2'>
          <GraduationCap color='#D5564D' className={iconClass} />
          <select
            id='student'
            required
            {...register('student')}
            className={`${inputClass} cursor-pointer pr-10 invalid:text-placeholder`}
            defaultValue=''
          >
            <option value='' disabled hidden>
              Velg utdanningsinstitusjon
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

        <label
          htmlFor='terms'
          className='mt-5 flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-gray'
        >
          <Checkbox id='terms' name='terms' required className='mt-0.5' />
          Jeg godtar VSAiTs retningslinjer og at opplysningene brukes til
          medlemsadministrasjon.
        </label>

        <button
          disabled={isSubmitting}
          type='submit'
          className='mt-6 w-full rounded-full bg-primary py-3.5 text-sm text-white shadow-md transition-all duration-300 hover:brightness-90 disabled:brightness-95'
        >
          {isSubmitting ? 'Laster ...' : 'Opprett konto  →'}
        </button>
      </form>

      <div className='my-6 flex items-center gap-4 text-xs text-gray/60'>
        <span className='h-px flex-1 bg-primary/15' />
        eller
        <span className='h-px flex-1 bg-primary/15' />
      </div>

      <p className='text-center text-sm text-gray'>
        Har du allerede en konto?{' '}
        <Link
          href='/login'
          className='text-primary transition-all duration-300 hover:brightness-90'
        >
          Logg inn
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
