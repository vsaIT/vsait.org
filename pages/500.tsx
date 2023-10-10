import { LargeHeader } from '@components/Header';
import Wave from '@components/Wave';
import type { NextPage } from 'next';

const Custom500: NextPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <LargeHeader>
        <>
          <h1 className="text-7xl mb-1.5 font-bold text-white">500</h1>
          <p className="w-9/12 text-white">Server-side error occurred...</p>
          {/* @ts-expect-error Server Component */}
          <Wave />
        </>
      </LargeHeader>
    </>
  );
};

export default Custom500;
