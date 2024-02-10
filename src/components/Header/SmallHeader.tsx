import { ChildrenProps } from 'src/lib/types';

const SmallHeader = ({ children }: ChildrenProps) => {
  return (
    <div className="flex w-full relative h-40 flex-col bg-gradient-to-b from-primary via-primary to-secondary justify-center items-center">
      {children}
    </div>
  );
};
export default SmallHeader;
