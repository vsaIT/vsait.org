import { forwardRef, LegacyRef } from 'react';

type LargeHeaderProps = {
  children: JSX.Element;
  className?: string;
};

const LargeHeader = (
  { children, className = '' }: LargeHeaderProps,
  ref: LegacyRef<HTMLDivElement>
) => {
  return (
    <div
      ref={ref}
      className={`relative flex h-144 w-full flex-col items-center justify-center bg-gradient-to-b from-primary via-primary to-secondary py-24 ${className}`}
    >
      {children}
    </div>
  );
};
export default forwardRef(LargeHeader);
