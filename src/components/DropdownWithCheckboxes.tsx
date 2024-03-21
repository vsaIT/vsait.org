import React, { useState } from 'react';

type Item = {
  id: number;
  label: string;
  checked: boolean;
};

const DropdownWithCheckboxes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([
    { id: 1, label: 'Option 1', checked: false },
    { id: 2, label: 'Option 2', checked: false },
    { id: 3, label: 'Option 3', checked: false },
  ]);

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
        className='border-gray-300 bg-gray-200 focus:ring-gray-500 rounded-md border px-4 py-2 font-medium text-black focus:outline-none focus:ring-2 focus:ring-opacity-50'
      >
        Select Options
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
