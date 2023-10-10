import { LargeHeader } from '@components/Header';
import Wave from '@components/Wave';
import type { NextPage } from 'next';

const Custom404: NextPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <LargeHeader>
        <>
          <h1 className="text-7xl mb-1.5 font-bold text-white">404</h1>
          <p className="w-9/12 text-white">Denne siden finnes ikke...</p>
          {/* @ts-expect-error Server Component */}
          <Wave />
        </>
      </LargeHeader>
    </>
  );
};

export default Custom404;
