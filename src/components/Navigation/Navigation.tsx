'use client';
import { userAtom } from '@/lib/atoms';
import { useUser } from '@/lib/hooks/useUser';
import '@/styles/hamburgers.css';
import { Role } from '@prisma/client';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileIcon from './ProfileIcon';

const baseNavigation = [
  { href: '/', text: 'Hjem' },
  { href: '/events', text: 'Arrangementer' },
  { href: '/organization', text: 'Om oss' },
  { href: '/retningslinjer', text: 'Retningslinjer' },
];

const Navigation = () => {
  const pathname = usePathname();
  const [user, setUser] = useAtom(userAtom);
  const { status: _, data: session } = useSession({
    required: false,
  });
  const { user: userData } = useUser(session?.user?.id as string);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [navigation, setNavigation] = useState(baseNavigation);

  useEffect(() => {
    if (session?.user.role === Role.ADMIN)
      setNavigation([...baseNavigation, { href: '/admin', text: 'Admin' }]);

    if (userData) setUser((prevState) => ({ ...prevState, ...userData }));
  }, [userData, session?.user.role]);

  return (
    <header className='absolute top-0 z-20 w-full'>
      <nav className='flex h-24 w-full items-center justify-between px-6 lg:justify-center lg:gap-5'>
        <Link href='/' className='overflow-hidden rounded-full'>
          <Image
            src='/logo.svg'
            alt='Vsait Logo'
            width={64}
            height={64}
            priority
          />
        </Link>
        <div
          className={`fixed right-4 top-4 flex flex-col items-center justify-end gap-5 rounded-lg rounded-tr-3xl bg-white p-4 text-lg transition duration-500 
          lg:static lg:w-1/2 lg:translate-x-0 lg:flex-row lg:rounded-none lg:bg-transparent lg:p-0 lg:opacity-100
          ${burgerOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          {navigation.map((nav) => (
            <div key={nav.text}>
              <Link
                onClick={() => setBurgerOpen(false)}
                href={nav.href}
                className={`hover:text-tertiary text-red-500 underline-offset-4 transition-all duration-300 hover:brightness-150 
                lg:text-white lg:hover:text-secondary
                ${
                  pathname.split('/')[1] === nav.href.substring(1)
                    ? '!text-tertiary underline brightness-150 lg:!text-secondary'
                    : ''
                }`}
              >
                {nav.text}
              </Link>
            </div>
          ))}
          <ProfileIcon user={user} onClick={() => setBurgerOpen(false)} />
        </div>
        <button
          className={`hamburger hamburger--collapse fixed right-6 top-6 z-30 h-12 w-12 rounded-full
          ${burgerOpen ? 'is-active' : ''}
          `}
          type='button'
          onClick={() => setBurgerOpen(!burgerOpen)}
        >
          <span className='hamburger-box'>
            <span className='hamburger-inner'></span>
          </span>
        </button>
      </nav>
    </header>
  );
};
export default Navigation;
