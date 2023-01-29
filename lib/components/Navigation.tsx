import { Person } from '@lib/icons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import { useRouter } from 'next/router';

const navigation = [
  { href: '/', text: 'Hjem' },
  { href: '/events', text: 'Arrangementer' },
  { href: '/organization', text: 'Om oss' },
  { href: '/guidelines', text: 'Retningslinjer' },
];

const Navigation = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: false,
  });

  const avatar = createAvatar(bigSmile, {
    seed: 'test',
  });

  return (
    <header className="absolute top-0 flex h-24 w-full items-center justify-center px-6 z-10 max-w-screen-xl">
      <Link href="/">
        <a className="absolute left-8 rounded-full overflow-hidden h-16 w-16">
          <Image
            src="https://medlem.vsait.org/static/home/logo.svg"
            alt="Vercel Logo"
            layout="fill"
          />
        </a>
      </Link>
      <nav className="flex gap-5">
        {navigation.map((nav) => (
          <Link href={nav.href} key={nav.text}>
            <a
              className={`text-white transition-all duration-300 underline-offset-4 hover:text-secondary hover:brightness-150 ${
                router.pathname.split('/')[1] === nav.href.substring(1)
                  ? 'underline text-secondary brightness-150'
                  : ''
              }`}
            >
              {nav.text}
            </a>
          </Link>
        ))}
      </nav>
      <div className="absolute right-8 w-auto ">
        {session ? (
          <Link href="/profile">
            <a className="flex items-center justify-end gap-2 text-white fill-white transition-all duration-300 hover:text-[#ffffb1] hover:fill-[#ffffb1]">
              <span
                className={`underline-offset-4 ${
                  router.pathname.includes('profile')
                    ? 'underline !text-secondary brightness-150 !fill-secondary'
                    : ''
                }`}
              >
                Profil
              </span>
              <div className="flex items-center justify-center rounded-full overflow-hidden bg-white bg-opacity-100 p-1">
                <div className="relative w-14 h-14">
                  <Image
                    src={avatar.toDataUriSync()}
                    alt="Profile icon"
                    layout="fill"
                  />
                </div>
              </div>
            </a>
          </Link>
        ) : (
          // <Link href="/profile">
          //   <a
          //     className={`flex w-auto items-center justify-end gap-2 text-white fill-white transition-all duration-300 underline-offset-4 hover:text-secondary hover:brightness-150 hover:fill-secondary ${
          //       router.pathname.includes('profile')
          //         ? 'underline !text-secondary brightness-150 !fill-secondary'
          //         : ''
          //     }`}
          //   >
          //     <span>Profil</span>
          //     <Person color="inherit" className="w-6" />
          //   </a>
          // </Link>
          <></>
        )}
      </div>
    </header>
  );
};
export default Navigation;
