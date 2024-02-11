type SmallHeaderProps = {
  children?: JSX.Element;
};

const SmallHeader = ({ children }: SmallHeaderProps) => {
  return (
    <div className='relative flex h-40 w-full flex-col items-center justify-center bg-gradient-to-b from-primary via-primary to-secondary'>
      {children}
    </div>
  );
};
export default SmallHeader;
