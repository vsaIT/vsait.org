import { Briefcase, Discord, Envelope, Facebook, Instagram } from '@lib/icons';

const Footer = () => {
  return (
    <footer className="flex h-80 flex-col w-full items-center justify-center bg-gray text-white">
      <h1 className="text-5xl mb-1.5 font-bold text-white">VSAiT</h1>
      <p>Vietnamese Student Association in Trondheim</p>
      <hr className="border-t-2 border-white h-1 w-4/12 py-1 my-2" />
      <h2 className="text-lg mb-1.5 font-bold text-white">
        Kontaktinformasjon
      </h2>
      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-4">
          <Briefcase color="inherit" className="flex h-5 w-5 fill-white" />
          993 646 482 (OrgNr)
        </p>
        <p className="flex items-center gap-4 fill-white hover:fill-secondary hover:text-secondary transition-all">
          <Envelope color="inherit" className="flex h-5 w-5" />
          <a href="mailto:vsait@vsait.org" className="text-inherit">
            vsait@vsait.org
          </a>
        </p>
      </div>
      <div className="flex gap-4 m-4 mt-8">
        <div className="flex h-7 w-7">
          <a
            href="https://instagram.com/vsaitr"
            className="fill-white hover:fill-secondary transition-all"
          >
            <Instagram color="inherit" className="flex h-7 w-7" />
          </a>
        </div>
        <div className="flex h-7 w-7">
          <a
            href="https://facebook.com/VSAITrondheim"
            className="fill-white hover:fill-secondary transition-all"
          >
            <Facebook color="inherit" className="flex h-7 w-7" />
          </a>
        </div>
        <div className="flex h-7 w-7">
          <a
            href="https://discord.gg/jJSBfwcUMh"
            className="fill-white hover:fill-secondary transition-all"
          >
            <Discord color="inherit" className="flex h-7 w-7" />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
