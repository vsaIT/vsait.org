import { Membership } from '@prisma/client';
import { useCallback, useState } from 'react';
import { Accordion } from './Accordion';

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
  const [items, setItems] = useState<Item[]>(() =>
    initialItems.map((item, index) => ({
      ...item,
      id: index,
    }))
  );

  const handleCheckboxChange = useCallback(
    (id: number) => {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setItems(updatedItems);
      onChange(
        updatedItems
          .filter((item) => item.checked)
          .map((item) => ({ year: item.value }))
      );
    },
    [items, onChange]
  );

  return (
    <Accordion
      label={label}
      labelClassName='text-sm lg:text-base font-medium text-left px-2 py-2'
      buttonClassName='bg-neutral-50 shadow-md'
      className='w-full md:w-3/5 lg:w-2/5'
    >
      <div className='relative z-10 mt-1 rounded-lg py-3 shadow-lg'>
        {items.map((item) => (
          <div
            key={item.id}
            className='hover:bg-gray-100 flex items-center px-4 py-2'
          >
            <input
              id={`checkbox-${item.id}`}
              type='checkbox'
              checked={items.find((i) => i.id === item.id)?.checked}
              onChange={(_) => handleCheckboxChange(item.id as number)}
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
    </Accordion>
  );
};

export default DropdownWithCheckboxes;
