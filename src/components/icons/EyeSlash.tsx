const EyeSlash = ({ color = '#464646', className = '' }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g
        stroke={color}
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M9.9 5.9A9.6 9.6 0 0 1 12 5.8c6 0 9.5 6.2 9.5 6.2a17 17 0 0 1-3.2 3.9M6.4 7.7A16.6 16.6 0 0 0 2.5 12S6 18.2 12 18.2c1.4 0 2.7-.3 3.8-.8' />
        <path d='M10.1 10.1a3.1 3.1 0 0 0 4.3 4.3' />
        <path d='M3.5 3.5l17 17' />
      </g>
    </svg>
  );
};
export default EyeSlash;
