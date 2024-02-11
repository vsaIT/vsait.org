'use client';
import { HTMLProps, useEffect, useRef } from 'react';

const IndeterminateCheckbox = ({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current && typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type='checkbox'
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
};
export default IndeterminateCheckbox;
