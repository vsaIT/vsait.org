import { filter } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import {
  getSession,
  getCsrfToken,
  signIn,
  getProviders,
} from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import Image from 'next/image';

const MINIMUM_ACTIVITY_TIMEOUT = 850;
type ForgotFormValues = {
  csrfToken: string;
  email: string;
};

const ForgotForm = ({ csrfToken }: any) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<ForgotFormValues>();

  const onSubmit = async (data: ForgotFormValues) => {
    setSubmitting(true);
    try {
      signIn('app-forgot', {
        callbackUrl: '/',
        email: data.email,
      });

      setTimeout(() => {
        setSubmitting(false);
      }, MINIMUM_ACTIVITY_TIMEOUT);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className=" flex flex-col justify-center w-128 p-8 mb-10 text-left bg-white shadow-2xl rounded-2xl transform -translate-y-10">
        <div className="flex flex-col justify-center m-auto text-center w-8/12 mb-8">
          <div className="flex relative w-24 h-24 rounded-full overflow-hidden m-auto mb-3">
            <Image
              src="https://medlem.vsait.org/static/home/logo.svg"
              alt="Vercel Logo"
              width={72}
              height={72}
              layout="fill"
            />
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
            <input
              {...register('csrfToken')}
              type="hidden"
              defaultValue={csrfToken}
              hidden
            />
            <div className="relative my-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
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
            <a href="/login" className="text-darker">
              Logg inn
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session) {
    return { redirect: { permanent: false, destination: '/' } };
  }

  const csrfToken = await getCsrfToken({ req: context.req });
  const providers = filter(await getProviders(), (provider: any) => {
    return provider.type !== 'credentials';
  });

  return {
    props: { csrfToken, providers },
  };
}
export default ForgotForm;
