import { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showLabel?: boolean;
  formRegisterReturn?: UseFormRegisterReturn;
} & React.InputHTMLAttributes<HTMLInputElement>;

function FormInput({
  label,
  type,
  minLength,
  onChange,
  formRegisterReturn,
  defaultValue = '',
  required = false,
  disabled = false,
  className = '',
  showLabel = true,
}: InputProps) {
  return (
    <div className='relative w-full'>
      {showLabel && (
        <label
          htmlFor={label.toLowerCase()}
          className='absolute -top-2 left-4 block bg-white px-2 text-left text-sm font-medium text-stone-500'
        >
          {label}
        </label>
      )}
      <div className='mt-1'>
        <input
          {...formRegisterReturn}
          id={label.toLowerCase()}
          type={type}
          minLength={minLength}
          autoComplete={label.toLowerCase().replace('-', '')}
          placeholder={label}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`w-full cursor-text rounded-xl border-2 border-stone-300 px-4 py-3 text-left text-sm leading-6 outline-none ${disabled ? 'text-stone-500' : ''} ${className}`}
        />
      </div>
    </div>
  );
}

export default FormInput;
