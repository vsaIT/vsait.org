import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="flex h-80 flex-col w-full items-center justify-center bg-gray text-white">
      <h1 className="text-5xl mb-1.5 font-bold text-white">VSAiT</h1>
      <p>Vietnamese Student Association in Trondheim</p>
      <hr className="border-t-2 border-white h-1 w-4/12 py-1 my-2" />
      <h2 className="text-lg mb-1.5 font-bold text-white">
        Kontaktinformasjon
      </h2>
      <div>
        <p>993 646 482 (OrgNr)</p>
        <p>
          <a href="mailto:vsait@vsait.org">vsait@vsait.org</a>
        </p>
      </div>
      <div className="flex gap-4 m-4">
        <div className="bg-white h-4 w-4"></div>
        <div className="bg-white h-4 w-4"></div>
        <div className="bg-white h-4 w-4"></div>
      </div>
    </footer>
  );
};
export default Footer;
