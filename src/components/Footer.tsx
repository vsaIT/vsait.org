import { Discord, Facebook, Instagram } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';

const pageLinks = [
  { href: '/', text: 'Hjem' },
  { href: '/events', text: 'Arrangementer' },
  { href: '/organization', text: 'Om oss' },
  { href: '/retningslinjer', text: 'Retningslinjer' },
];

const socials = [
  {
    href: 'https://instagram.com/vsaitr',
    label: 'Instagram',
    Icon: Instagram,
  },
  {
    href: 'https://facebook.com/VSAITrondheim',
    label: 'Facebook',
    Icon: Facebook,
  },
  { href: 'https://discord.gg/phpANWP7Yd', label: 'Discord', Icon: Discord },
];

const Footer = () => {
  return (
    <footer className='bg-brown w-full text-white'>
      <div className='mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 sm:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:gap-12'>
        <div>
          <Link href='/' className='inline-block overflow-hidden rounded-full'>
            <Image src='/logo.svg' alt='VSAiT logo' width={44} height={44} />
          </Link>
          <h2 className='mt-4 text-xl text-primary'>VSAiT</h2>
          <p className='mt-2 max-w-[16rem] text-sm leading-relaxed text-white/70'>
            Vietnamese Student Association in Trondheim – siden 1990.
          </p>
        </div>

        <div>
          <h3 className='text-xs uppercase tracking-[0.15em] text-secondary'>
            Sider
          </h3>
          <ul className='mt-5 flex flex-col gap-3 text-sm'>
            {pageLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='text-white/80 transition-colors hover:text-secondary'
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='text-xs uppercase tracking-[0.15em] text-secondary'>
            Kontakt
          </h3>
          <div className='mt-5 flex flex-col gap-4 text-sm text-white/80'>
            <p>
              993 646 482
              <span className='block text-white/50'>Org.nr</span>
            </p>
            <a
              href='mailto:vsait@vsait.org'
              className='text-inherit transition-colors hover:text-secondary'
            >
              vsait@vsait.org
            </a>
          </div>
        </div>

        <div>
          <h3 className='text-xs uppercase tracking-[0.15em] text-secondary'>
            Følg oss
          </h3>
          <p className='mt-5 max-w-[16rem] text-sm leading-relaxed text-white/70'>
            Hold deg oppdatert på Instagram, Facebook og Discord.
          </p>
          <div className='mt-5 flex gap-3'>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-10 w-10 items-center justify-center rounded-full bg-brownlight fill-white transition-all hover:bg-secondary hover:fill-brown'
              >
                <Icon color='inherit' className='h-4 w-4' />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-6xl px-6 sm:px-10'>
        <hr className='border-t border-white/10' />
        <div className='flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between'>
          <p>
            © {new Date().getFullYear()} VSAiT – Vietnamese Student Association
            in Trondheim
          </p>
          <p>
            Nettside laget av Thomas Nguyen (IT) og Jenny Ngo Luong (Design)
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
