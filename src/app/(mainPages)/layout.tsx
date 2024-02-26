import Footer from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

export default function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Navigation />
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <main className='flex w-full flex-1 flex-col items-center text-center'>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
