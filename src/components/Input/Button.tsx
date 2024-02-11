import { HTMLProps } from 'react';

type ButtonProps = {
  children?: JSX.Element;
  onClick?: () => void;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  inverted?: boolean;
} & Omit<HTMLProps<HTMLButtonElement>, 'onClick'>;

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
        className={`rounded-xl bg-white px-10 py-2 text-black shadow-md transition-all duration-300 hover:brightness-85 ${className}`}
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
      className={`rounded-xl bg-primary px-10 py-2 text-white shadow-md transition-all duration-300 hover:brightness-85 ${className}`}
    >
      {text ?? ''}
      {children}
    </button>
  );
};
export default Button;
