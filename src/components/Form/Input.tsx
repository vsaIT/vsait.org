type InputProps = {
  id?: string;
  label: string;
  type: string;
  minLength?: number;
  defaultValue?: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  showLabel?: boolean;
};

function Input({
  label,
  type,
  minLength = 0,
  defaultValue = '',
  onChange = () => {},
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

export default Input;
