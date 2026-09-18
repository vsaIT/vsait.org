'use client';
import AuthAside from '@/components/AuthAside';
import { ForgotPasswordForm } from '@/components/Form';

function ForgotPassword(): JSX.Element {
  return (
    <div className='flex min-h-screen w-full flex-col lg:flex-row'>
      <AuthAside
        title='Vi hjelper deg inn igjen.'
        description='Oppgi e-posten din, så får du en lenke som lar deg sette et nytt passord.'
      />

      <section className='flex w-full flex-1 items-center justify-center bg-cream px-6 pb-20 pt-32 sm:px-12 lg:w-1/2 lg:pb-24 lg:pt-40'>
        <ForgotPasswordForm />
      </section>
    </div>
  );
}

export default ForgotPassword;
