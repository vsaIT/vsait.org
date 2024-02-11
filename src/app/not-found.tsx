'use client';
import { LargeHeader } from '@/components/Header';
import Wave from '@/components/Wave';
import type { NextPage } from 'next';
import { usePathname } from 'next/navigation';

const Custom404: NextPage = () => {
  const pathname = usePathname();
  return (
    <>
      <LargeHeader>
        <>
          <h1 className='mb-1.5 text-7xl font-bold text-white'>404</h1>
          <p className='w-9/12 text-white'>
            Denne siden &quot;{pathname}&quote; finnes ikke...
          </p>
          <Wave />
        </>
      </LargeHeader>
    </>
  );
};

export default Custom404;
