const Briefcase = ({ color = '#464646', className = '' }) => {
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
        d="M34.5 9H61.5C62.325 9 63 9.675 63 10.5V18H33V10.5C33 9.675 33.675 9 34.5 9ZM24 10.5V18H12C5.38125 18 0 23.3813 0 30V48H36H60H96V30C96 23.3813 90.6188 18 84 18H72V10.5C72 4.70625 67.2937 0 61.5 0H34.5C28.7062 0 24 4.70625 24 10.5ZM96 54H60V60C60 63.3187 57.3187 66 54 66H42C38.6813 66 36 63.3187 36 60V54H0V78C0 84.6188 5.38125 90 12 90H84C90.6188 90 96 84.6188 96 78V54Z"
        fill={color}
      />
    </svg>
  );
};
export default Briefcase;
