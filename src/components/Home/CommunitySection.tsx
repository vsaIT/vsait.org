import { board } from '@/app/(mainPages)/organization/constants';
import Image from 'next/image';
import Link from 'next/link';

const FOUNDED_YEAR = 1990;

const stats = [
  { value: String(FOUNDED_YEAR), label: 'Grunnlagt' },
  { value: String(board.length), label: 'I styret' },
  { value: '6–7+', label: 'Arrangementer i året' },
];

const CommunitySection = () => {
  return (
    <div className='grid grid-cols-1 items-center gap-10 rounded-3xl bg-primary/[0.06] p-8 text-left sm:p-12 lg:grid-cols-[1fr_1.2fr]'>
      <div>
        <p className='flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-primary'>
          <span className='h-0.5 w-6 rounded-full bg-primary' />
          Vårt fellesskap
        </p>
        <h2 className=' mt-3 max-w-md text-3xl leading-snug sm:text-4xl'>
          Et bånd mellom studenter, kultur og vennskap
        </h2>

        <dl className='mt-8 flex flex-wrap gap-x-10 gap-y-6'>
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className='text-3xl text-primary'>{stat.value}</dt>
              <dd className='mt-1 text-xs text-gray'>{stat.label}</dd>
            </div>
          ))}
        </dl>

        <Link
          href='/organization'
          className='mt-8 block w-full rounded-full bg-primary px-6 py-2.5 text-center text-sm text-white shadow-sm transition-all duration-300 hover:brightness-90 sm:inline-block sm:w-auto'
        >
          Vår historie
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md'>
          <Image
            src='/cover5.JPG'
            alt='Styret 2026/2027'
            fill
            sizes='(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw'
            className='scale-125 object-cover'
          />
        </div>

        <div className='relative aspect-[3/2] overflow-hidden rounded-2xl shadow-md sm:translate-y-16'>
          <Image
            src='/cover6.jpg'
            alt='Tet Trung Thu 2025'
            fill
            sizes='(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw'
            className='scale-125 object-cover'
          />
        </div>
      </div>
    </div>
  );
};
export default CommunitySection;
