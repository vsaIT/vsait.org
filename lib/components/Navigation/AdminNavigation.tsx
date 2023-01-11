import Image from 'next/image';

const navigation = [
  { href: '/', text: 'Hjem' },
  { href: '/events', text: 'Arrangementer' },
  { href: '/organization', text: 'Om oss' },
  { href: '/guidelines', text: 'Retningslinjer' },
];
const AdminNavigation = () => {
  return (
    <header className="absolute top-0 flex h-24 w-full items-center justify-center z-10 max-w-screen-xl bg-white">
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
          <a
            className="text-black transition-all duration-300 underline-offset-4 hover:text-secondary hover:brightness-95"
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
export default AdminNavigation;
