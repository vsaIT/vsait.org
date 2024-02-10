import React from 'react';
import { SelectProps } from 'src/lib/types';

const Select = <T extends object>({
  options,
  id,
  register,
}: SelectProps<T>) => {
  return (
    <div>
      <select
        id={id as string}
        className="w-full py-3 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out invalid:text-placeholder"
        {...(register && id ? register(id) : {})}
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
