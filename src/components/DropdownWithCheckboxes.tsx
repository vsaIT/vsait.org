import React, { useState } from 'react';

type Item = {
  id?: number;
  label: number;
  checked: boolean;
};

type DropdownCheckboxProps = {
  id: string,
  label: string,
  initialItems: Item[]
}

const DropdownWithCheckboxes = ({
  id,
  label,
  initialItems,
}: DropdownCheckboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const temp: Item[] = []
  initialItems.forEach((item, index) => {
    temp.push({
      ...item,
      id: index
    })
  })
  const [items, setItems] = useState(temp)

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className='relative inline-block'>
      <button
        onClick={toggleDropdown}
        className='bg-neutral-50 border-stone-300 shadow-md rounded-md font-medium text-black texy-xl text-left pl-2 py-4'
      >
        {label}
      </button>
      {isOpen && (
        <div className='absolute left-0 z-10 mt-2 w-48 overflow-hidden rounded-md bg-white shadow-lg'>
          {items.map((item) => (
            <div
              key={item.id}
              className='hover:bg-gray-100 flex items-center px-4 py-2'
            >
              <input
                id={`checkbox-${item.id}`}
                type='checkbox'
                checked={items.find((i) => i.id === item.id)?.checked}
                onChange={() => handleCheckboxChange(item.id)}
                className='form-checkbox text-gray-600 h-5 w-5'
              />
              <label
                htmlFor={`checkbox-${item.id}`}
                className='text-gray-700 ml-2 text-sm'
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownWithCheckboxes;
