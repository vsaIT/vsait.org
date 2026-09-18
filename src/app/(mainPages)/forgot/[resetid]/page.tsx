'use client';
import AuthAside from '@/components/AuthAside';
import { ResetPasswordForm } from '@/components/Form';

type ResetWithIdProps = {
  params: { resetid: string };
};

function ResetPassword({ params }: ResetWithIdProps): JSX.Element {
  return (
    <div className='flex min-h-screen w-full flex-col lg:flex-row'>
      <AuthAside
        title='Nesten i mål.'
        description='Velg et nytt passord, så er du klar til å logge inn og melde deg på igjen.'
      />

      <section className='flex w-full flex-1 items-center justify-center bg-cream px-6 pb-20 pt-32 sm:px-12 lg:w-1/2 lg:pb-24 lg:pt-40'>
        <ResetPasswordForm resetid={params.resetid} />
      </section>
    </div>
  );
}

export default ResetPassword;
