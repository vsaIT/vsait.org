import { RegistrationForm } from 'src/components/Form';
import { SmallHeader } from 'src/components/Header';
import type { NextPage } from 'next';

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
