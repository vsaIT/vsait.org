import { ButtonProps } from '@lib/types';

const Button = ({ text, onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-white py-3 px-12 rounded-3xl bg-primary hover:bg-white hover:text-black shadow-md transition-all"
    >
      {text ?? ''}
      {children}
    </button>
  );
};
export default Button;
