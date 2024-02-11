import React from 'react';
import { SelectProps } from '@/types/types';

const Select = <T extends object>({
  options,
  id,
  register,
}: SelectProps<T>) => {
  return (
    <div>
      <select
        id={id as string}
        className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-3 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out invalid:text-placeholder'
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
