import React from 'react';

type SlideCheckboxProps = {
  className?: string;
  id: string;
  label?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const SlideCheckbox = React.forwardRef<HTMLInputElement, SlideCheckboxProps>(
  ({ id, className = '', label = '', checked, onChange, ...rest }, ref) => {
    return (
      <div className={'w-full py-5 text-left ' + className}>
        <label
          className='relative inline-flex cursor-pointer items-center'
          htmlFor={id}
        >
          <input
            id={id}
            type='checkbox'
            className='peer sr-only'
            checked={checked}
            onChange={onChange}
            ref={ref}
            {...rest}
          />
          <div className="after:border-gray-300 peer h-6 w-11 rounded-full bg-placeholder after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4"></div>
          <span className='text-gray-900 ml-3 text-sm font-medium'>
            {label}
          </span>
        </label>
      </div>
    );
  }
);
SlideCheckbox.displayName = 'SlideCheckbox';
export default SlideCheckbox;
