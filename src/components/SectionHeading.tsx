type SectionHeadingProps = {
  title: string;
  children?: JSX.Element;
};

export default function SectionHeading({
  title,
  children,
}: SectionHeadingProps) {
  return (
    <div className='flex flex-col items-center'>
      <p className='flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-primary'>
        <span className='h-0.5 w-6 rounded-full bg-primary' />
      </p>
      <h2 className='mt-3 max-w-2xl text-3xl leading-snug  sm:text-4xl'>
        {title}
      </h2>
      {children}
    </div>
  );
}
