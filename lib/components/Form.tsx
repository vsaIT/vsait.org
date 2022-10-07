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

const MINIMUM_ACTIVITY_TIMEOUT = 850;
type LoginFormValues = {
  csrfToken: string;
  email: string;
  password: string;
};

export default function Form({ csrfToken }: any) {
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true);
    try {
      signIn('app-login', {
        callbackUrl: '/',
        email: data.email,
        password: data.password,
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
      <div className=" flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h1 className="text-xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
            Sign In
          </h1>
          <h2>Sign in with an existing account, or create new account.</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 mx-2 rounded-sm sm:px-10">
            <form
              className="text-center my-12"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register('csrfToken')}
                type="hidden"
                defaultValue={csrfToken}
                hidden
              />
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-400"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...register('email')}
                    className="appearance-none w-full font-medium py-3 border-b border-t-0 border-l-0 border-r-0 border-dashed outline-none text-xl text-center leading-6 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <div>
                <div className="mt-8">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-neutral-400"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    minLength={12}
                    required
                    {...register('password')}
                    className="appearance-none w-full font-medium py-3 border-b border-t-0 border-l-0 border-r-0 border-dashed outline-none text-xl text-center leading-6 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button__md button__primary w-full"
                >
                  {isSubmitting ? <p>Loading...</p> : <p>Sign in</p>}
                </button>
              </div>
            </form>
            <section className="mt-8 text-center">
              <div className="flex flex-col mb-3">
                <hr className="h-0 border-t mt-1" />
                <div className="-mt-3 text-sm text-center">
                  <span className="px-2 bg-white text-secondary">Or with</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

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
