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
import { Button } from '@components/Input';
import { MINIMUM_ACTIVITY_TIMEOUT } from '@lib/constants';
import ToastMessage from '../Toast';

type RegistrationFormValues = {
  csrfToken: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  password: string;
  repeatPassword: string;
  foodNeeds: string;
  student: string;
};

type RegistrationFormProps = {
  csrfToken?: string;
};

const RegistrationForm = ({ csrfToken }: RegistrationFormProps) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<RegistrationFormValues>();

  const onSubmit = async (data: RegistrationFormValues) => {
    setSubmitting(true);
    signIn('app-register', { ...data, redirect: false }).then((res) => {
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
      <div className="flex flex-col justify-center w-144 p-8 mb-10 text-left bg-white shadow-2xl rounded-2xl transform -translate-y-10">
        <h1 className="text-xl font-bold leading-7 text-gray-900">Register:</h1>
        <div className="w-full pt-8">
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

            <div className="flex gap-5">
              <div className="relative w-full">
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
                >
                  Fornavn
                </label>
                <div className="mt-1">
                  <input
                    id="firstname"
                    type="text"
                    autoComplete="first-name"
                    placeholder="Fornavn"
                    required
                    {...register('firstName')}
                    className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                  />
                </div>
              </div>

              <div className="relative w-full">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
                >
                  Etternavn
                </label>
                <div className="mt-1">
                  <input
                    id="lastname"
                    type="text"
                    autoComplete="last-name"
                    placeholder="Etternavn"
                    required
                    {...register('lastName')}
                    className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                  />
                </div>
              </div>
            </div>

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
                htmlFor="birthdate"
                className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
              >
                Fødselsdato
              </label>
              <div className="mt-1">
                <input
                  id="birthdate"
                  type="date"
                  autoComplete="birthdate"
                  placeholder="Fødselsdato"
                  required
                  {...register('birthdate')}
                  className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="relative w-full">
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

              <div className="relative w-full">
                <label
                  htmlFor="repeatPassword"
                  className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
                >
                  Gjenta passord
                </label>
                <div className="mt-1">
                  <input
                    id="repeatPassword"
                    type="password"
                    autoComplete="repeat-password"
                    placeholder="Gjenta passord"
                    minLength={8}
                    required
                    {...register('repeatPassword')}
                    className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                  />
                </div>
              </div>
            </div>

            <div className="relative my-6">
              <label
                htmlFor="foodNeeds"
                className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
              >
                Matbehov
              </label>
              <div className="mt-1">
                <input
                  id="foodNeeds"
                  type="text"
                  autoComplete="allergies"
                  placeholder="Matbehov"
                  {...register('foodNeeds')}
                  className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                />
              </div>
            </div>

            <div className="relative my-6">
              <label
                htmlFor="student"
                className="block text-sm font-medium text-left text-stone-500 absolute bg-white left-4 -top-2 px-2"
              >
                Student
              </label>
              <div className="mt-1">
                <select
                  id="student"
                  required
                  {...register('student')}
                  className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out invalid:text-placeholder"
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Velg student informasjon
                  </option>
                  <option value="NTNU">
                    Norges teknisk-naturvitenskapelige universitet
                  </option>
                  <option value="BI">Handelshøyskolen BI</option>
                  <option value="DMMH">Dronning Mauds Minne Høgskole</option>
                  <option value="Other">Andre</option>
                  <option value="Non-student">Ikke student</option>
                </select>
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
                {isSubmitting ? <p>Loading...</p> : <p>Register</p>}
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
export default RegistrationForm;
