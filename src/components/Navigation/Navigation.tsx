import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import { usePathname } from 'next/navigation';
import { useAtom } from 'jotai';
import { profileIconAtom, userAtom } from '@/lib/atoms';
import { useEffect } from 'react';
import { UserType } from '@/types/types';
import { signOut } from 'next-auth/react';
import { Role } from '@prisma/client';

const navigation = [
  { href: '/', text: 'Hjem' },
  { href: '/events', text: 'Arrangementer' },
  { href: '/organization', text: 'Om oss' },
  { href: '/retningslinjer', text: 'Retningslinjer' },
];

const Navigation = () => {
  const pathname = usePathname();
  const [profileIcon, setProfileIcon] = useAtom(profileIconAtom);
  const [user, setUser] = useAtom(userAtom);
  const { status: _, data: session } = useSession({
    required: false,
  });

  const avatar = createAvatar(bigSmile, {
    seed: profileIcon.seed,
    flip: true,
  });

  useEffect(() => {
    if (!session?.user?.id) return;
    if (profileIcon.initial) return;

    const fetchUser = async () => {
      await fetch(`/api/user/${session.user.id}`)
        .then(async (response) => {
          if (!response.ok) throw new Error(response.statusText);
          return await response.json();
        })
        .then((data: UserType) => {
          setUser((prevState) => ({ ...prevState, ...data }));
          setProfileIcon({
            seed: data.profileIconSeed,
            initial: true,
          });
        })
        .catch(async (_error) => {
          await signOut().then(() => (window.location.href = '/'));
        });
    };
    fetchUser();
  }, [profileIcon, setProfileIcon, setUser, session?.user?.id]);

  return (
    <header className='absolute left-1/2 top-0 z-10 flex h-24 w-full max-w-screen-xl -translate-x-1/2 transform items-center justify-center px-6'>
      <Link
        href='/'
        className='absolute left-8 h-16 w-16 overflow-hidden rounded-full'
      >
        <Image src='/logo.svg' alt='Vsait Logo' fill />
      </Link>
      <nav className='flex gap-5'>
        {navigation.map((nav) => (
          <div key={nav.text}>
            <Link
              href={nav.href}
              className={`text-white underline-offset-4 transition-all duration-300 hover:text-secondary hover:brightness-150 ${
                pathname.split('/')[1] === nav.href.substring(1)
                  ? 'text-secondary underline brightness-150'
                  : ''
              }`}
            >
              {nav.text}
            </Link>
          </div>
        ))}
        {/*admin nav*/}
        {session?.user?.role === Role.ADMIN && (
          <div key='admin'>
            <Link
              href='/admin'
              className={`text-white underline-offset-4 transition-all duration-300 hover:text-secondary hover:brightness-150 ${
                pathname.split('/')[1] === 'admin'
                  ? 'text-secondary underline brightness-150'
                  : ''
              }`}
            >
              Admin
            </Link>
          </div>
        )}
      </nav>
      <div className='absolute right-8 w-auto '>
        {session ? (
          <>
            <>
              <Link
                href='/profile'
                className='flex items-center justify-end gap-2 fill-white text-white transition-all duration-300 hover:fill-[#ffffb1] hover:text-[#ffffb1]'
              >
                <span
                  className={`underline-offset-4 ${
                    pathname.includes('profile')
                      ? '!fill-secondary !text-secondary underline brightness-150'
                      : ''
                  }`}
                >
                  {user.firstName || 'Profil'}
                </span>
                <div className='flex items-center justify-center overflow-hidden rounded-full bg-white bg-opacity-50 p-1'>
                  <div
                    className={`relative h-14 w-14 transition-all duration-700 ${
                      !profileIcon.initial ? 'opacity-0' : ''
                    }`}
                  >
                    <Image
                      src={avatar.toDataUriSync()}
                      alt='Profile icon'
                      fill
                    />
                  </div>
                </div>
              </Link>
            </>
          </>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};
export default Navigation;
