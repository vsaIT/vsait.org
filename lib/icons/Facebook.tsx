const Facebook = ({ color = '#464646', className = '' }) => {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="inherit"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M94.5 48C94.5 22.3125 73.6875 1.5 48 1.5C22.3125 1.5 1.5 22.3125 1.5 48C1.5 71.2087 18.5044 90.4463 40.7344 93.9375V61.4419H28.9219V48H40.7344V37.755C40.7344 26.1019 47.6719 19.665 58.2975 19.665C63.3863 19.665 68.7075 20.5725 68.7075 20.5725V32.01H62.8425C57.0675 32.01 55.2656 35.595 55.2656 39.2719V48H68.1619L66.0994 61.4419H55.2656V93.9375C77.4956 90.4463 94.5 71.2087 94.5 48Z"
        fill={color}
      />
    </svg>
  );
};
export default Facebook;
