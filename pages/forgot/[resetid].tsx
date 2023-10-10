import { SmallHeader } from '@lib/components/Header';
import { Button } from '@lib/components/Input';
import StyledSwal from '@lib/components/StyledSwal';
import { MINIMUM_ACTIVITY_TIMEOUT } from '@lib/constants';
import { Lock } from '@lib/icons';
import { ApiResponseType } from '@lib/types';
import { getErrorMessage } from '@lib/utils';
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type ResetFormValues = {
  password: string;
  repeatPassword: string;
};

const ForgotPassword: NextPage = () => {
  const router = useRouter();
  const { resetid } = router.query;
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
            if (data.statusCode === 200) return data;
            else throw new Error(data.message);
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
                      className="font-medium text-primary hover:underline"
                      href="/"
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

  const loading = isLoading || !isSuccess || data?.statusCode !== 200;
  // Redirect to 404 if finished loading and no user is found
  if (!loading && !data?.user) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Tilbakestill passord</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center text-center">
        {/* @ts-expect-error Server Component */}
        <SmallHeader />

        <div className="flex flex-col justify-center w-128 p-8 mb-10 text-left bg-white shadow-2xl rounded-2xl transform -translate-y-10">
          <div className="flex flex-col justify-center m-auto text-center w-8/12 mb-5">
            <div className="flex justify-center relative w-24 h-24 overflow-hidden m-auto fill-slate-700">
              {/* @ts-expect-error Server Component */}
              <Lock color="inherit" />
            </div>
            <h2 className="text-l font-bold leading-7 text-gray-900">
              Tilbakestill passordet ditt
            </h2>
            <p className="text-sm">
              Oppgi nytt passord, så oppdaterer vi passordet til kontoen din.
            </p>
          </div>
          <div className="w-full">
            <form
              className="text-center w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="relative my-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2 rounded-md"
                >
                  Nytt passord
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="password"
                    placeholder="Nytt passord"
                    minLength={8}
                    required
                    {...register('password')}
                    className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                  />
                </div>
              </div>
              <div className="relative my-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2 rounded-md"
                >
                  Gjenta nytt passord
                </label>
                <div className="mt-1">
                  <input
                    id="repeatPassword"
                    type="password"
                    autoComplete="repeat-password"
                    placeholder="Gjenta nytt passord"
                    minLength={8}
                    required
                    {...register('repeatPassword')}
                    className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2 flex justify-center">
                {/* @ts-expect-error Server Component */}
                <Button
                  disabled={isSubmitting || loading}
                  onClick={() => console.log('submit')}
                  className="w-full"
                  type="submit"
                >
                  {isSubmitting ? <p>Loading...</p> : <p>Oppdater passord</p>}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
