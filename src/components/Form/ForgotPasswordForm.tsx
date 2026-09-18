import StyledSwal from '@/components/StyledSwal';
import { Envelope } from '@/components/icons';
import { MINIMUM_ACTIVITY_TIMEOUT } from '@/lib/constants';
import { getErrorMessage } from '@/lib/utils';
import { ApiResponseType } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type ForgotFormValues = {
  email: string;
};

const ForgotPasswordForm = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<ForgotFormValues>();

  const onSubmit = async (data: ForgotFormValues) => {
    StyledSwal.fire({
      icon: 'info',
      title: <p>Tilbakebestill passord!</p>,
      text: `Sender instruksjoner for å tilbakestille passord...`,
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
        await fetch('/api/forgot/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
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
              title: <p>Vellykket!</p>,
              text: 'En e-post med instruksjoner for å tilbakestille passordet er blitt sendt til en bruker registrert med gitt e-post',
              showConfirmButton: false,
              timer: 5000,
            });
          })
          .catch((error: unknown) => {
            return StyledSwal.fire({
              icon: 'error',
              title: <p>Mislykket!</p>,
              html: (
                <>
                  <p>
                    Sending av instruksjoner for å tilbakestille passordet
                    mislykket
                  </p>
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

  const labelClass =
    'block text-left text-[0.7rem] uppercase tracking-[0.14em] text-gray/70';
  const inputClass =
    'w-full rounded-xl border border-primary/20 bg-white py-3 pl-11 pr-4 text-left text-sm  shadow-sm outline-none transition-all duration-300 placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/20';
  const iconClass =
    'pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2';

  return (
    <div className='flex w-full max-w-sm flex-col text-left'>
      <h1 className='text-3xl leading-snug '>Glemt passord?</h1>
      <p className='mt-2 text-sm leading-relaxed text-gray'>
        Oppgi e-postadressen din, så sender vi deg en lenke som gir deg tilgang
        til å endre passordet til kontoen din.
      </p>

      <form className='mt-6 w-full' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='email' className={labelClass}>
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

        <button
          disabled={isSubmitting}
          type='submit'
          className='mt-6 w-full rounded-full bg-primary py-3.5 text-sm text-white shadow-md transition-all duration-300 hover:brightness-90 disabled:brightness-95'
        >
          {isSubmitting ? 'Sender ...' : 'Send lenke  →'}
        </button>
      </form>

      <div className='my-6 flex items-center gap-4 text-xs text-gray/60'>
        <span className='h-px flex-1 bg-primary/15' />
        eller
        <span className='h-px flex-1 bg-primary/15' />
      </div>

      <p className='text-center text-sm text-gray'>
        Kom du på passordet?{' '}
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

export default ForgotPasswordForm;
