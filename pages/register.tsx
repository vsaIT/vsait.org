import { RegistrationForm } from '@components/Form';
import { SmallHeader } from '@components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';

const Registration: NextPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <SmallHeader />
      {/* @ts-expect-error Server Component */}
      <RegistrationForm />
    </>
  );
};

export default Registration;
