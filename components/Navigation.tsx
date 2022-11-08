import Image from 'next/image';

const navigation = [
  { href: '/', text: 'Hjem' },
  { href: '/events', text: 'Arrangementer' },
  { href: '/organization', text: 'Om oss' },
];
const Navigation = () => {
  return (
    <header className="absolute top-0 flex h-24 w-full items-center justify-center border-t px-6 z-10">
      <a
        className="absolute left-8"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      >
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </a>
      <nav className="flex gap-5">
        {navigation.map((nav) => (
          <a
            className="text-white transition-all hover:font-bold"
            key={nav.text}
            href={nav.href}
          >
            {nav.text}
          </a>
        ))}
      </nav>
    </header>
  );
};
export default Navigation;
