'use client';
import AuthAside from '@/components/AuthAside';
import { LoginForm } from '@/components/Form';

function Login(): JSX.Element {
  return (
    <div className='flex min-h-screen w-full flex-col lg:flex-row'>
      <AuthAside
        title='Et varmt fellesskap venter på deg.'
        description='Bli medlem for å melde deg på arrangementer, feire vietnamesiske høytider og møte andre studenter i Trondheim.'
        showMembershipNote
      />

      <section className='flex w-full flex-1 items-center justify-center bg-cream px-6 pb-20 pt-32 sm:px-12 lg:w-1/2 lg:pb-24 lg:pt-40'>
        <LoginForm />
      </section>
    </div>
  );
}

export default Login;
