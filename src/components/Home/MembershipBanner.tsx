import Link from 'next/link';

const MembershipBanner = () => {
  return (
    <div className='relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-primary px-8 py-10 text-left sm:px-12 md:flex-row md:items-center md:justify-between'>
      <div
        aria-hidden
        className='pointer-events-none absolute -right-24 top-1/2 aspect-square h-[180%] -translate-y-1/2 rounded-full bg-white/20'
      />

      <div className='relative'>
        <h2 className='text-2xl text-white sm:text-3xl'>
          Bli en del av fellesskapet
        </h2>
        <p className='mt-2 text-sm text-white/80'>
          Meld deg inn, eller ta kontakt om du lurer på noe.
        </p>
      </div>

      <Link
        href='/medlemskap'
        className='relative w-full shrink-0 rounded-full bg-white px-6 py-3 text-center text-sm text-primary shadow-md transition-all duration-300 hover:brightness-95 sm:w-fit'
      >
        Bli medlem →
      </Link>
    </div>
  );
};
export default MembershipBanner;
