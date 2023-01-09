import { ChildrenProps } from '@lib/types';

const LargeHeader = ({ children, className = '' }: ChildrenProps) => {
  return (
    <div
      className={`flex w-full relative h-144 py-24 flex-col bg-gradient-to-b from-primary via-primary to-secondary justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
};
export default LargeHeader;
