const GraduationCap = ({ color = '#464646', className = '' }) => {
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
        <path d='M12 3.4 22 8.4 12 13.4 2 8.4 12 3.4Z' />
        <path d='M6.2 10.9v4.6c0 1.6 2.6 2.9 5.8 2.9s5.8-1.3 5.8-2.9v-4.6' />
        <path d='M21.4 8.7v4.4' />
      </g>
    </svg>
  );
};
export default GraduationCap;
