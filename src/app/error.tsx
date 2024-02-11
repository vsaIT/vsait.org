'use client';
import { LargeHeader } from '@/components/Header';
import Wave from '@/components/Wave';
import { useEffect } from 'react';

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <LargeHeader>
        <>
          <h1 className='mb-1.5 text-7xl font-bold text-white'>500</h1>
          <p className='w-9/12 text-white'>Server-side error occurred...</p>
          <p className='w-9/12 text-white'>Error: {error.message}</p>
          <Wave />
        </>
      </LargeHeader>
    </>
  );
};

export default Error;
