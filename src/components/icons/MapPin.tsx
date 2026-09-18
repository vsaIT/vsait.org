const MapPin = ({ color = '#464646', className = '' }) => {
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
        <path d='M20 10.2c0 5.6-8 11.8-8 11.8s-8-6.2-8-11.8a8 8 0 1 1 16 0Z' />
        <circle cx='12' cy='10' r='2.8' />
      </g>
    </svg>
  );
};
export default MapPin;
