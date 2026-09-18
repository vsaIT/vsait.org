type HeaderProps = {
  title?: string;
  children?: JSX.Element;
  waveColor?: string;
  // Taller headers make room for pages with more than a title in the gradient
  height?: string;
};

const CurvyHeader = ({
  title,
  children,
  waveColor = '#fff',
  height = 'sm:h-96',
}: HeaderProps) => {
  return (
    <div
      className={`curvyHeader relative flex w-full flex-col items-center justify-center bg-gradient-to-b from-primary via-primary to-secondary pb-24 pt-28 sm:py-0 ${height}`}
    >
      {title && (
        <div className='relative z-10 m-auto block w-full max-w-screen-xl text-4xl text-white'>
          <h1 className='absolute -top-6 left-20 md:left-40'>{title}</h1>
        </div>
      )}
      <svg
        width='1510'
        height='165'
        viewBox='0 0 1512 166'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute bottom-0 left-0 z-0 block h-16 w-full sm:h-32'
        preserveAspectRatio='none'
      >
        <path
          d='M0 12.1249L65.7391 24.9852C131.478 37.8455 262.957 59.8503 394.435 59.8503C525.913 59.8503 629.739 53.4615 788.87 24.9853C948 -3.49086 1076.39 -8.72651 1238 14.9852C1369.48 34.2756 1442.5 59.8503 1512 95.6487V166.449C1446.26 166.449 1314.78 166.449 1183.3 166.449C1051.83 166.449 920.348 166.449 788.87 166.449C657.391 166.449 525.913 166.449 394.435 166.449C262.957 166.449 131.478 166.449 65.7391 166.449H0V12.1249Z'
          fill={waveColor}
        />
      </svg>

      {children}
    </div>
  );
};
export default CurvyHeader;
