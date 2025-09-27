import React from 'react';

type SelectFieldProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, name, options, defaultValue, onChange }, ref) => {
    return (
      <div className='relative'>
        <label
          htmlFor={name}
          className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
        >
          {label}
        </label>
        <div className='mt-1'>
          <select
            ref={ref}
            id={name}
            required
            className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out invalid:text-placeholder'
            defaultValue={defaultValue}
            onChange={onChange}
          >
            <option value='' disabled hidden>
              Choose an option
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';

export default SelectField;
