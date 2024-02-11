import {
  Briefcase,
  Discord,
  Envelope,
  Facebook,
  Instagram,
} from '@/components/icons';

const Footer = () => {
  return (
    <footer className='flex h-80 w-full flex-col items-center justify-center bg-gray text-white'>
      <h1 className='mb-1.5 text-5xl font-bold text-white'>VSAiT</h1>
      <p>Vietnamese Student Association in Trondheim</p>
      <hr className='my-2 h-1 w-4/12 border-t-2 border-white py-1' />
      <h2 className='mb-1.5 text-lg font-bold text-white'>
        Kontaktinformasjon
      </h2>
      <div className='flex flex-col gap-1'>
        <p className='flex items-center gap-4'>
          <Briefcase color='inherit' className='flex h-5 w-5 fill-white' />
          993 646 482 (OrgNr)
        </p>
        <p className='flex items-center gap-4 fill-white transition-all hover:fill-secondary hover:text-secondary'>
          <Envelope color='inherit' className='flex h-5 w-5' />
          <a href='mailto:vsait@vsait.org' className='text-inherit'>
            vsait@vsait.org
          </a>
        </p>
      </div>
      <div className='m-4 mt-8 flex gap-4'>
        <div className='flex h-7 w-7'>
          <a
            href='https://instagram.com/vsaitr'
            className='fill-white transition-all hover:fill-secondary'
          >
            <Instagram color='inherit' className='flex h-7 w-7' />
          </a>
        </div>
        <div className='flex h-7 w-7'>
          <a
            href='https://facebook.com/VSAITrondheim'
            className='fill-white transition-all hover:fill-secondary'
          >
            <Facebook color='inherit' className='flex h-7 w-7' />
          </a>
        </div>
        <div className='flex h-7 w-7'>
          <a
            href='https://discord.gg/phpANWP7Yd'
            className='fill-white transition-all hover:fill-secondary'
          >
            <Discord color='inherit' className='flex h-7 w-7' />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
