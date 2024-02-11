'use client';
import { SmallHeader } from '@/components/Header';
import { Button } from '@/components/Input';
import StyledSwal from '@/components/StyledSwal';
import { MINIMUM_ACTIVITY_TIMEOUT } from '@/lib/constants';
import { Lock } from '@/components/icons';
import { ApiResponseType } from '@/types';
import { getErrorMessage } from '@/lib/utils';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type ForgotFormValues = {
  email: string;
};

const ForgotPassword: NextPage = () => {
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
        // Confirm immediately when open swal
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

  return (
    <>
      <SmallHeader />

      <div className='mb-10 flex w-128 -translate-y-10 transform flex-col justify-center rounded-2xl bg-white p-8 text-left shadow-2xl'>
        <div className='m-auto mb-8 flex w-8/12 flex-col justify-center text-center'>
          <div className='relative m-auto flex h-24 w-24 justify-center overflow-hidden fill-slate-700'>
            <Lock color='inherit' />
          </div>
          <h2 className='text-l text-gray-900 font-bold leading-7'>
            Problemer med innlogging?
          </h2>
          <p className='text-sm'>
            Oppgi din e-postadresse, så sender vi deg en lenke som gir deg
            tilgang til å endre passordet til kontoen din.
          </p>
        </div>
        <h1 className='text-gray-900 text-xl font-bold leading-7'>
          Glemt passord:
        </h1>
        <div className='w-full pt-2'>
          <form
            className='w-full text-center'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='relative my-6'>
              <label
                htmlFor='email'
                className='absolute -top-2 left-4 block rounded-md bg-white px-2 text-left text-sm font-medium text-stone-500'
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

            <div className='mt-6 flex justify-center space-y-2'>
              <Button
                disabled={isSubmitting}
                onClick={() => console.log('submit')}
                className='w-full'
                type='submit'
              >
                {isSubmitting ? <p>Loading...</p> : <p>Send lenke</p>}
              </Button>
            </div>
          </form>
          <div className='mt-4 flex justify-center'>
            <Link href='/login' className='text-darker'>
              Logg inn
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
