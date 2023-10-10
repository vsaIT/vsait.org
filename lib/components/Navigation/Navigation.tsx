import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { profileIconAtom, userAtom } from '@lib/atoms';
import { useEffect } from 'react';
import { UserType } from '@lib/types';
import { signOut } from 'next-auth/react';

const navigation = [
  { href: '/', text: 'Hjem' },
  { href: '/events', text: 'Arrangementer' },
  { href: '/organization', text: 'Om oss' },
  { href: '/guidelines', text: 'Retningslinjer' },
];

const Navigation = () => {
  const router = useRouter();
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
          setProfileIcon({ seed: data.profileIconSeed, initial: true });
        })
        .catch(async (_error) => {
          await signOut().then(() => (window.location.href = '/'));
        });
    };
    fetchUser();
  }, [profileIcon, setProfileIcon, setUser, session?.user?.id]);

  return (
    <header className="absolute top-0 flex h-24 w-full items-center justify-center px-6 z-10 margin-left-auto">
      {/* @ts-expect-error Server Component */}
      <Link
        href="/"
        className="absolute left-8 rounded-full overflow-hidden h-16 w-16"
      >
        {/* @ts-expect-error Server Component */}
        <Image src="logo.svg" alt="Vercel Logo" fill />
      </Link>
      <nav className="flex gap-5">
        {navigation.map((nav) => (
          <div key={nav.text}>
            {/* @ts-expect-error Server Component */}
            <Link
              href={nav.href}
              className={`text-white transition-all duration-300 underline-offset-4 hover:text-secondary hover:brightness-150 ${
                router.pathname.split('/')[1] === nav.href.substring(1)
                  ? 'underline text-secondary brightness-150'
                  : ''
              }`}
            >
              {nav.text}
            </Link>
          </div>
        ))}
      </nav>
      <div className="absolute right-8 w-auto ">
        {session ? (
          <>
            <>
              {/* @ts-expect-error Server Component */}
              <Link
                href="/profile"
                className="flex items-center justify-end gap-2 text-white fill-white transition-all duration-300 hover:text-[#ffffb1] hover:fill-[#ffffb1]"
              >
                <span
                  className={`underline-offset-4 ${
                    router.pathname.includes('profile')
                      ? 'underline !text-secondary brightness-150 !fill-secondary'
                      : ''
                  }`}
                >
                  {user.firstName || 'Profil'}
                </span>
                <div className="flex items-center justify-center rounded-full overflow-hidden bg-white bg-opacity-50 p-1">
                  <div
                    className={`relative w-14 h-14 transition-all duration-700 ${
                      !profileIcon.initial ? 'opacity-0' : ''
                    }`}
                  >
                    {/* @ts-expect-error Server Component */}
                    <Image
                      src={avatar.toDataUriSync()}
                      alt="Profile icon"
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
