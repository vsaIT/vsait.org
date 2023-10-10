import { LoginForm } from '@components/Form';
import { SmallHeader } from '@components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';

const Login: NextPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <SmallHeader />
      {/* @ts-expect-error Server Component */}
      <LoginForm />
    </>
  );
};

export default Login;
