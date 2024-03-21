import { Membership } from '@prisma/client';
import React, { useEffect, useMemo, useState } from 'react';
import { CaretDown, CaretUp } from './icons';

type Item = {
  id?: number;
  value: number;
  checked: boolean;
};

type DropdownCheckboxProps = {
  label: string;
  initialItems: Item[];
  onChange: (memberships: Membership[]) => void;
};

const DropdownWithCheckboxes = ({
  label,
  initialItems,
  onChange,
}: DropdownCheckboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Item[]>(() =>
    initialItems.map((item, index) => ({
      ...item,
      id: index,
    }))
  );

  const filteredItems = useMemo(
    () => items.filter((item) => item.checked),
    [items]
  );

  useEffect(() => {
    onChange(
      filteredItems.map((item) => {
        return { year: item.value };
      })
    );
  }, [filteredItems]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (id: number) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  return (
    <div className='relative inline-block'>
      <button
        onClick={toggleDropdown}
        className='flex w-full justify-between rounded-md border-stone-300 bg-neutral-50 px-3 py-3 text-sm font-medium text-black shadow-md hover:bg-slate-200 lg:w-1/3 lg:text-base'
      >
        {label}
        <div className='mx-5 flex items-center gap-2 fill-slate-600 text-xs font-medium text-slate-600'>
          {isOpen ? (
            <>
              Lukke <CaretUp color='inherit' />
            </>
          ) : (
            <>
              Åpne
              <CaretDown color='inherit' />
            </>
          )}
        </div>
      </button>

      <div
        className={`relative left-0 z-10 mt-2 w-48 overflow-hidden rounded-md bg-white shadow-lg transition duration-500 
        ${isOpen ? 'h-fit -translate-y-0 opacity-100' : 'h-0 -translate-y-8 opacity-0'}
      `}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className='hover:bg-gray-100 flex items-center px-4 py-2'
          >
            <input
              id={`checkbox-${item.id}`}
              type='checkbox'
              checked={items.find((i) => i.id === item.id)?.checked}
              onChange={(e) => handleCheckboxChange(item.id as number)}
              // onChange={() => {}}
              className='form-checkbox text-gray-600 h-5 w-5'
            />
            <label
              htmlFor={`checkbox-${item.id}`}
              className='text-gray-700 ml-2 text-sm'
            >
              {item.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownWithCheckboxes;
