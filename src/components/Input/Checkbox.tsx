import React from 'react';

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className'
> & {
  className?: string;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', ...rest }, ref) => {
    return (
      <span className={`relative flex h-4 w-4 shrink-0 ${className}`}>
        <input
          ref={ref}
          type='checkbox'
          className='peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-primary/30 bg-white transition-all duration-300 checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30'
          {...rest}
        />
        <svg
          aria-hidden
          viewBox='0 0 16 16'
          className='pointer-events-none absolute inset-0 h-4 w-4 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100'
        >
          <path
            d='M4.5 8.5l2.25 2.25L11.5 6'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </span>
    );
  }
);
Checkbox.displayName = 'Checkbox';
export default Checkbox;
