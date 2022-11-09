import { ButtonProps } from '@lib/types';

const Button = ({
  text,
  onClick,
  children,
  disabled,
  type,
  className = '',
}: ButtonProps) => {
  return (
    <button
      disabled={disabled ?? false}
      type={type}
      onClick={onClick}
      className={`text-white py-2 px-10 rounded-xl bg-primary hover:bg-white hover:text-black shadow-md transition-all ${className}`}
    >
      {text ?? ''}
      {children}
    </button>
  );
};
export default Button;
