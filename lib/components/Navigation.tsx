import { Person } from '@lib/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
  { href: '/', text: 'Hjem' },
  { href: '/events', text: 'Arrangementer' },
  { href: '/organization', text: 'Om oss' },
  { href: '/guidelines', text: 'Retningslinjer' },
];

const Navigation = () => {
  const router = useRouter();

  return (
    <header className="absolute top-0 flex h-24 w-full items-center justify-center px-6 z-10 max-w-screen-xl">
      <Link href="/">
        <a className="absolute left-8 rounded-full overflow-hidden h-16 w-16">
          <Image
            src="https://medlem.vsait.org/static/home/logo.svg"
            alt="Vercel Logo"
            width={72}
            height={72}
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
        <Link href="/profil">
          <a
            className={`flex w-auto items-center justify-end gap-2 text-white fill-white transition-all duration-300 underline-offset-4 hover:text-secondary hover:brightness-150 hover:fill-secondary ${
              router.pathname.includes('profil')
                ? 'underline !text-secondary brightness-150 !fill-secondary'
                : ''
            }`}
          >
            <span>Profil</span>
            <Person color="inherit" className="w-6" />
          </a>
        </Link>
      </div>
    </header>
  );
};
export default Navigation;
