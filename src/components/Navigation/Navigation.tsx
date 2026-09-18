'use client';
import { userAtom } from '@/lib/atoms';
import { useScrollDirection } from '@/lib/hooks/useScrollDirection';
import { useScrolledPast } from '@/lib/hooks/useScrolledPast';
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
import HamburgerMenuButton from './HamburgerMenuButton';

// How far the page scrolls before the bar stops being a transparent 
// overlay on the page header and takes on its own background
const SOLID_AFTER = 24;

const baseNavigationList = [
  { href: '/', text: 'Hjem' },
  { href: '/events', text: 'Arrangementer' },
  { href: '/organization', text: 'Om oss' },
  { href: '/medlemskap', text: 'Medlemskap' },
  { href: '/retningslinjer', text: 'Retningslinjer' },
];

const Navigation = () => {
  const pathname = usePathname();
  const [user, setUser] = useAtom(userAtom);
  const { status: _, data: session } = useSession({
    required: false,
  });
  const { user: userData } = useUser(session?.user?.id as string);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [navigationList, setNavigationList] = useState(baseNavigationList);
  const closeMenu = () => setIsBurgerOpen(false);
  // Same scroll watcher the back-to-top button runs on
  const isScrolled = useScrolledPast(SOLID_AFTER);
  const scrollDirection = useScrollDirection();
  // Reading downwards is the one time the bar is in the way
  const isHidden = isScrolled && scrollDirection === 'down' && !isBurgerOpen;

  useEffect(() => {
    if (session?.user.role === Role.ADMIN)
      setNavigationList([
        ...baseNavigationList,
        { href: '/admin', text: 'Admin' },
      ]);

    if (userData) setUser((prevState) => ({ ...prevState, ...userData }));
  }, [userData, session?.user.role, setUser]);

  return (
    <header
      className={`fixed z-50 w-full pb-3 transition-all duration-300 ${
        isScrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-6'
      } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 backdrop-blur-md transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <nav className='relative mx-auto flex w-11/12 max-w-[58rem] items-center justify-between rounded-full py-2 pl-3 pr-4 lg:bg-orange-50 lg:px-4 lg:shadow-sm'>
        <Link
          href='/'
          className={`flex items-center gap-2.5 transition-all hover:brightness-90 lg:text-primary ${
            isScrolled ? 'text-primary' : 'text-white'
          }`}
        >
          <span className='overflow-hidden rounded-full'>
            <Image
              src='/logo.svg'
              alt='Vsait Logo'
              width={36}
              height={36}
              priority
            />
          </span>
          <span className='text-lg'>VSAiT</span>
        </Link>
        <div
          className={`fixed right-4 top-4 flex flex-col justify-end gap-5 rounded-lg rounded-tr-3xl bg-orange-50 py-4 pl-5 pr-9 text-base transition duration-500
          lg:pointer-events-auto lg:static lg:translate-x-0 lg:flex-row lg:items-center lg:gap-8 lg:rounded-none lg:bg-transparent lg:p-0 lg:opacity-100
          ${
            isBurgerOpen
              ? 'translate-x-0 opacity-100'
              : 'pointer-events-none translate-x-full opacity-0'
          }`}
        >
          {navigationList.map((nav) => (
            <div key={nav.text}>
              <Link
                onClick={closeMenu}
                href={nav.href}
                className={`relative transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100
                lg:hover:text-primary
                ${
                  pathname.split('/')[1] === nav.href.substring(1)
                    ? 'text-primary brightness-150 after:scale-x-100'
                    : ''
                }`}
              >
                {nav.text}
              </Link>
            </div>
          ))}
          {session ? (
            <ProfileIcon user={user} onClick={closeMenu} />
          ) : (
            <Link
              onClick={closeMenu}
              href='/login'
              className={`group inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:bg-opacity-75 hover:shadow-md active:scale-95 lg:-ml-2 ${
                pathname.split('/')[1] === 'login'
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-orange-50'
                  : ''
              }`}
            >
              Logg inn
            </Link>
          )}
        </div>
        <HamburgerMenuButton
          isBurgerOpen={isBurgerOpen}
          setIsBurgerOpen={setIsBurgerOpen}
        />
      </nav>
    </header>
  );
};
export default Navigation;
