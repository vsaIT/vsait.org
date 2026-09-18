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
      className={`relative flex h-144 w-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(160deg,var(--tw-gradient-stops))] from-primary via-primary to-secondary py-24 sm:bg-gradient-to-br ${className}`}
    >
      {children}
    </div>
  );
};
export default forwardRef(LargeHeader);
