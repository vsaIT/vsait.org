import { ButtonProps } from '@lib/types';

const Button = ({ text, onClick, children, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-white py-2 px-10 rounded-3xl bg-primary hover:bg-white hover:text-black shadow-md transition-all ${className}`}
    >
      {text ?? ''}
      {children}
    </button>
  );
};
export default Button;
