import { SmallHeader } from '@lib/components/Header';
import { Button } from '@lib/components/Input';
import StyledSwal from '@lib/components/StyledSwal';
import { MINIMUM_ACTIVITY_TIMEOUT } from '@lib/constants';
import { Lock } from '@lib/icons';
import { ApiResponseType } from '@lib/types';
import { getErrorMessage } from '@lib/utils';
import type { NextPage } from 'next';
import Head from 'next/head';
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
            if (data.statusCode === 200) return data;
            else throw new Error(data.message);
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
                  <code className="mt-2 w-full">{getErrorMessage(error)}</code>
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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Glemt passord</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center text-center">
        {/* @ts-expect-error Server Component */}
        <SmallHeader />

        <div className="flex flex-col justify-center w-128 p-8 mb-10 text-left bg-white shadow-2xl rounded-2xl transform -translate-y-10">
          <div className="flex flex-col justify-center m-auto text-center w-8/12 mb-8">
            <div className="flex justify-center relative w-24 h-24 overflow-hidden m-auto fill-slate-700">
              {/* @ts-expect-error Server Component */}
              <Lock color="inherit" />
            </div>
            <h2 className="text-l font-bold leading-7 text-gray-900">
              Problemer med innlogging?
            </h2>
            <p className="text-sm">
              Oppgi din e-postadresse, så sender vi deg en lenke som gir deg
              tilgang til å endre passordet til kontoen din.
            </p>
          </div>
          <h1 className="text-xl font-bold leading-7 text-gray-900">
            Glemt passord:
          </h1>
          <div className="w-full pt-2">
            <form
              className="text-center w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="relative my-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2 rounded-md"
                >
                  E-post
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="E-post"
                    required
                    {...register('email')}
                    className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2 flex justify-center">
                {/* @ts-expect-error Server Component */}
                <Button
                  disabled={isSubmitting}
                  onClick={() => console.log('submit')}
                  className="w-full"
                  type="submit"
                >
                  {isSubmitting ? <p>Loading...</p> : <p>Send lenke</p>}
                </Button>
              </div>
            </form>
            <div className="flex justify-center mt-4">
              {/* @ts-expect-error Server Component */}
              <Link href="/login" className="text-darker">
                Logg inn
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
