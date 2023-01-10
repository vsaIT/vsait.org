import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  { href: '/', text: 'Hjem' },
  { href: '/events', text: 'Arrangementer' },
  { href: '/organization', text: 'Om oss' },
  { href: '/guidelines', text: 'Retningslinjer' },
];
const Navigation = () => {
  return (
    <header className="absolute top-0 flex h-24 w-full items-center justify-center px-6 z-10 max-w-screen-xl">
      <a
        className="absolute left-8 rounded-full overflow-hidden h-16 w-16"
        href="/"
      >
        <Image
          src="https://medlem.vsait.org/static/home/logo.svg"
          alt="Vercel Logo"
          width={72}
          height={72}
          layout="fill"
        />
      </a>
      <nav className="flex gap-5">
        {navigation.map((nav) => (
          <Link href={nav.href} key={nav.text}>
            <a className="text-white transition-all duration-300 underline-offset-4 hover:text-secondary hover:brightness-150">
              {nav.text}
            </a>
          </Link>
        ))}
      </nav>
      <a
        className="absolute right-8 rounded-full overflow-hidden h-16 w-16"
        href="/profile"
      >
        <Image
          src="https://medlem.vsait.org/static/home/logo.svg"
          alt="Vercel Logo"
          width={72}
          height={72}
          layout="fill"
        />
      </a>
    </header>
  );
};
export default Navigation;
