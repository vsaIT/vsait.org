import { filter } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import {
  getSession,
  getCsrfToken,
  signIn,
  getProviders,
  SignInResponse,
} from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import { MINIMUM_ACTIVITY_TIMEOUT } from '@lib/constants';
import ToastMessage from '../Toast';

type LoginFormValues = {
  csrfToken: string;
  email: string;
  password: string;
};

const LoginForm = ({ csrfToken }: any) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormValues>();
  console.log(csrfToken);

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true);
    console.log(csrfToken);
    signIn('app-login', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (!res) return;
      if (res.ok) {
        window.location.replace('/');
        console.log('Success');
      } else if (res.error) {
        console.error(res.error);
        ToastMessage({ type: 'error', message: res.error });
      }
      setTimeout(() => {
        setSubmitting(false);
      }, MINIMUM_ACTIVITY_TIMEOUT);
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center w-128 p-8 mb-10 text-left bg-white shadow-2xl rounded-2xl transform -translate-y-10">
        <h1 className="text-xl font-bold leading-7 text-gray-900">Logg inn:</h1>
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

            <div className="relative my-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
              >
                Passord
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Passord"
                  minLength={8}
                  required
                  {...register('password')}
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
                {isSubmitting ? <p>Loading...</p> : <p>Logg inn</p>}
              </Button>
            </div>
          </form>
          <div className="flex justify-between mt-4">
            <a href="/forgot" className="text-darker">
              Glemt passord?
            </a>
            <a href="/register" className="text-darker">
              Register
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
export default LoginForm;
