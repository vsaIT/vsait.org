const Utensils = ({ color = '#464646', className = '' }) => {
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
        <path d='M6.8 2.8v5.1a2.4 2.4 0 0 0 4.8 0V2.8' />
        <path d='M9.2 10.3V21.2' />
        <path d='M19.2 2.8c-1.7 1.5-2.6 3.7-2.6 6 0 1.3.9 2.3 2.1 2.3h.5' />
        <path d='M19.2 2.8V21.2' />
      </g>
    </svg>
  );
};
export default Utensils;
