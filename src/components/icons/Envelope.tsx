const Envelope = ({ color = '#464646', className = '' }) => {
  return (
    <svg
      width='96'
      height='96'
      viewBox='0 0 96 96'
      fill='inherit'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M9 12C4.03125 12 0 16.0312 0 21C0 23.8313 1.33125 26.4937 3.6 28.2L44.4 58.8C46.5375 60.3938 49.4625 60.3938 51.6 58.8L92.4 28.2C94.6687 26.4937 96 23.8313 96 21C96 16.0312 91.9688 12 87 12H9ZM0 33V72C0 78.6188 5.38125 84 12 84H84C90.6188 84 96 78.6188 96 72V33L55.2 63.6C50.925 66.8063 45.075 66.8063 40.8 63.6L0 33Z'
        fill={color}
      />
    </svg>
  );
};
export default Envelope;
