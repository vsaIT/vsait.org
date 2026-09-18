import StyledSwal from '@/components/StyledSwal';
import { Eye, EyeSlash, Lock } from '@/components/icons';
import { MINIMUM_ACTIVITY_TIMEOUT } from '@/lib/constants';
import { getErrorMessage } from '@/lib/utils';
import { ApiResponseType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type ResetFormValues = {
  password: string;
  repeatPassword: string;
};

const ResetPasswordForm = ({ resetid }: { resetid: string }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<ResetFormValues>();

  const { isSuccess, isLoading, error, data } = useQuery({
    queryKey: ['resetid', resetid],
    queryFn: () => fetch(`/api/forgot/${resetid}`).then((res) => res.json()),
    enabled: !!resetid,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });

  const onSubmit = async (data: ResetFormValues) => {
    if (!data.password || !data.repeatPassword || !resetid) return;

    StyledSwal.fire({
      icon: 'info',
      title: <p>Oppdater passord!</p>,
      text: `Oppdaterer passord...`,
      showCancelButton: false,
      showConfirmButton: false,
      confirmButtonText: `Ok`,
      cancelButtonText: 'Avbryt',
      showLoaderOnConfirm: true,
      didOpen: () => {
        StyledSwal.getConfirmButton()?.click();
      },
      preConfirm: async () => {
        // Disable registration spamming
        setSubmitting(true);
        // Hide cancel button when loading
        const cancelButton = StyledSwal.getCancelButton();
        if (cancelButton) cancelButton.style.opacity = '0';
        await fetch('/api/forgot/reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resetId: resetid,
            password: data.password,
            repeatPassword: data.repeatPassword,
          }),
        })
          .then(async (response) => {
            if (!response.ok) throw new Error(response.statusText);
            const data: ApiResponseType = await response.json();
            return data;
          })
          .then(async (data) => {
            console.log('Success:', data);
            await StyledSwal.fire({
              icon: 'success',
              title: <p>Passordet ditt er endret!</p>,
              html: (
                <>
                  <p>
                    Du vil bli sendt videre til hjemmesiden etter 10 sekunder...
                  </p>
                  <br />
                  <p>
                    Ikke blitt sendt enda?{' '}
                    <a
                      className='font-medium text-primary hover:underline'
                      href='/'
                    >
                      Trykk her.
                    </a>
                  </p>
                </>
              ),
              showConfirmButton: false,
              timer: 10000,
              allowOutsideClick: () => false,
            });
          })
          .then(() => {
            window.location.href = '/';
          })
          .catch((error: unknown) => {
            return StyledSwal.fire({
              icon: 'error',
              title: <p>Mislykket!</p>,
              html: (
                <>
                  <p>Oppdatering av passordet mislykket</p>
                  <code className='mt-2 w-full'>{getErrorMessage(error)}</code>
                </>
              ),
              showConfirmButton: false,
              timer: 5000,
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).finally(() =>
      setTimeout(() => {
        setSubmitting(false);
      }, MINIMUM_ACTIVITY_TIMEOUT)
    );
  };

  const loading = isLoading || !isSuccess;
  // Redirect to 404 if finished loading and no user is found
  if (!loading && !data?.id) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  const labelClass =
    'block text-left text-[0.7rem] uppercase tracking-[0.14em] text-gray/70';
  const inputClass =
    'w-full rounded-xl border border-primary/20 bg-white py-3 pl-11 pr-4 text-left text-sm  shadow-sm outline-none transition-all duration-300 placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/20';
  const iconClass =
    'pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2';

  return (
    <div className='flex w-full max-w-sm flex-col text-left'>
      <h1 className='text-3xl leading-snug '>
        Tilbakestill passordet
      </h1>
      <p className='mt-2 text-sm leading-relaxed text-gray'>
        Oppgi nytt passord, så oppdaterer vi passordet til kontoen din.
      </p>

      <form className='mt-6 w-full' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='password' className={labelClass}>
          Nytt passord
        </label>
        <div className='relative mt-2'>
          <Lock color='#D5564D' className={iconClass} />
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            autoComplete='new-password'
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

        <label htmlFor='repeatPassword' className={`${labelClass} mt-5`}>
          Gjenta nytt passord
        </label>
        <div className='relative mt-2'>
          <Lock color='#D5564D' className={iconClass} />
          <input
            id='repeatPassword'
            type={showPassword ? 'text' : 'password'}
            autoComplete='new-password'
            placeholder='••••••••'
            minLength={8}
            required
            {...register('repeatPassword')}
            className={inputClass}
          />
        </div>

        <button
          disabled={isSubmitting || loading}
          type='submit'
          className='mt-6 w-full rounded-full bg-primary py-3.5 text-sm text-white shadow-md transition-all duration-300 hover:brightness-90 disabled:brightness-95'
        >
          {isSubmitting ? 'Laster ...' : 'Oppdater passord  →'}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
