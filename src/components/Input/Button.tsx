import { ButtonProps } from 'src/lib/types';

const Button = ({
  onClick,
  text = '',
  children,
  className = '',
  inverted = false,
  ...props
}: ButtonProps) => {
  if (inverted) {
    return (
      <button
        {...props}
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
      {...props}
      onClick={onClick}
      className={`text-white py-2 px-10 rounded-xl bg-primary hover:brightness-85 shadow-md transition-all duration-300 ${className}`}
    >
      {text ?? ''}
      {children}
    </button>
  );
};
export default Button;
