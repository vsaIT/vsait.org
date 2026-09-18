const Star = ({ color = '#464646', className = '' }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='inherit'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M12 2.25L14.85 8.03L21.23 8.96L16.62 13.45L17.71 19.8L12 16.8L6.29 19.8L7.38 13.45L2.77 8.96L9.15 8.03L12 2.25Z'
        fill={color}
        stroke={color}
        strokeWidth='2.5'
        strokeLinejoin='round'
      />
    </svg>
  );
};
export default Star;
