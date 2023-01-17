import React from 'react';
import { SelectProps } from '@lib/types';

const Select = ({ options, defaultValue, onChange }: SelectProps) => {
  return (
    <div>
      <select
        value={defaultValue}
        defaultValue={defaultValue}
        className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out invalid:text-placeholder"
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
