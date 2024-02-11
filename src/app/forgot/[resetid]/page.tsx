'use client';
import { SmallHeader } from '@/components/Header';
import { Button } from '@/components/Input';
import StyledSwal from '@/components/StyledSwal';
import { MINIMUM_ACTIVITY_TIMEOUT } from '@/lib/constants';
import { Lock } from '@/components/icons';
import { ApiResponseType } from '@/types';
import { getErrorMessage } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type ResetFormValues = {
  password: string;
  repeatPassword: string;
};

type ResetWithIdProps = {
  params: { resetid: string };
};

function ForgotPassword({ params }: ResetWithIdProps): JSX.Element {
  const resetid = params.resetid;
  const [isSubmitting, setSubmitting] = useState(false);
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
        // Confirm immediately when open swal
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
            repeatPassword: data.password,
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

  const loading = isLoading || !isSuccess || data?.statusCode !== 200;
  // Redirect to 404 if finished loading and no user is found
  if (!loading && !data?.user) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  return (
    <>
      <SmallHeader />
      <div className='mb-10 flex w-128 -translate-y-10 transform flex-col justify-center rounded-2xl bg-white p-8 text-left shadow-2xl'>
        <div className='m-auto mb-5 flex w-8/12 flex-col justify-center text-center'>
          <div className='relative m-auto flex h-24 w-24 justify-center overflow-hidden fill-slate-700'>
            <Lock color='inherit' />
          </div>
          <h2 className='text-l text-gray-900 font-bold leading-7'>
            Tilbakestill passordet ditt
          </h2>
          <p className='text-sm'>
            Oppgi nytt passord, så oppdaterer vi passordet til kontoen din.
          </p>
        </div>
        <div className='w-full'>
          <form
            className='w-full text-center'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='relative my-6'>
              <label
                htmlFor='email'
                className='absolute -top-2 left-4 block rounded-md bg-white px-2 text-left text-sm font-medium text-stone-500'
              >
                Nytt passord
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  type='password'
                  autoComplete='password'
                  placeholder='Nytt passord'
                  minLength={8}
                  required
                  {...register('password')}
                  className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                />
              </div>
            </div>
            <div className='relative my-6'>
              <label
                htmlFor='email'
                className='absolute -top-2 left-4 block rounded-md bg-white px-2 text-left text-sm font-medium text-stone-500'
              >
                Gjenta nytt passord
              </label>
              <div className='mt-1'>
                <input
                  id='repeatPassword'
                  type='password'
                  autoComplete='repeat-password'
                  placeholder='Gjenta nytt passord'
                  minLength={8}
                  required
                  {...register('repeatPassword')}
                  className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
                />
              </div>
            </div>

            <div className='mt-6 flex justify-center space-y-2'>
              <Button
                disabled={isSubmitting || loading}
                onClick={() => console.log('submit')}
                className='w-full'
                type='submit'
              >
                {isSubmitting ? <p>Loading...</p> : <p>Oppdater passord</p>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
