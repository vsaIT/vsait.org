import { ChildrenProps } from '@lib/types';
import { forwardRef, LegacyRef } from 'react';

const LargeHeader = (
  { children, className = '' }: ChildrenProps,
  ref: LegacyRef<HTMLDivElement>
) => {
  return (
    <div
      ref={ref}
      className={`flex w-full relative h-144 py-24 flex-col bg-gradient-to-b from-primary via-primary to-secondary justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
};
export default forwardRef(LargeHeader);
