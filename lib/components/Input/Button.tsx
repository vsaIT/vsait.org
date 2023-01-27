import { ButtonProps } from '@lib/types';

const Button = ({
  text,
  onClick,
  children,
  disabled,
  type,
  className = '',
  inverted = false,
}: ButtonProps) => {
  if (inverted) {
    return (
      <button
        disabled={disabled ?? false}
        type={type}
        onClick={onClick}
        className={`text-black py-2 px-10 rounded-xl bg-white hover:brightness-85 shadow-md transition-all duration-300 ${className}`}
      >
        {text ?? ''}
        {children}
      </button>
    );
  }
  return (
    <button
      disabled={disabled ?? false}
      type={type}
      onClick={onClick}
      className={`text-white py-2 px-10 rounded-xl bg-primary hover:brightness-85 shadow-md transition-all duration-300 ${className}`}
    >
      {text ?? ''}
      {children}
    </button>
  );
};
export default Button;
