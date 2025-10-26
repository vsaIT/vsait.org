import React from 'react';

interface FormErrorBoxProps {
  errors: Record<string, { message?: string }>;
}

const FormErrorBox: React.FC<FormErrorBoxProps> = ({ errors }) => {
  if (!errors || Object.keys(errors).length === 0) return null;
  return (
    <div className='rounded-xl bg-red-100 p-4 text-red-700'>
      <h2 className='mb-2 font-bold'>Feil i skjemaet:</h2>
      <ul className='list-disc space-y-1 pl-5'>
        {Object.entries(errors).map(([field, error]) => (
          <li key={field}>
            {field}: {error?.message || 'Ugyldig verdi'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormErrorBox;
