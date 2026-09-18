const Sprout = ({ color = '#464646', className = '' }) => {
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
        strokeWidth='1.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M12 21.5C12 21.5 8.4 16.6 12 10.2C15.6 16.6 12 21.5 12 21.5Z' />
        <path d='M12 21.5C12 21.5 5.7 19.7 4.6 12.9C10.9 14 12 21.5 12 21.5Z' />
        <path d='M12 21.5C12 21.5 18.3 19.7 19.4 12.9C13.1 14 12 21.5 12 21.5Z' />
      </g>
    </svg>
  );
};
export default Sprout;
