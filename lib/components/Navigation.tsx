import Image from 'next/image';

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
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
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
          <a
            className="text-white transition-all hover:underline-offset-4"
            key={nav.text}
            href={nav.href}
          >
            {nav.text}
          </a>
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
