const CalendarCheck = ({ color = '#464646', className = '' }) => {
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
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <rect x='3' y='4.5' width='18' height='17' rx='3' />
        <path d='M8 2.5v4M16 2.5v4M3 10h18' />
        <path d='m9.5 15.5 1.8 1.8 3.7-3.7' />
      </g>
    </svg>
  );
};
export default CalendarCheck;
