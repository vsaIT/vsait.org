const caretRight =
  'M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z';

const CaretDoubleRight = ({ color = '#464646', className = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 448 512'
      width={21}
      height={24}
      className={className}
    >
      <path d={caretRight} fill={color} transform='translate(-48 0)' />
      <path d={caretRight} fill={color} transform='translate(176 0)' />
    </svg>
  );
};
export default CaretDoubleRight;
