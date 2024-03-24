'use client';
/**
 * Accordion component is a wrapper for the AnimateHeight component.
 * It provides a collapsible section with a toggle button and content.
 *
 * @summary Provides a collapsible section with a toggle button and content.
 *
 * @param children - The content to be displayed inside the accordion.
 * @param startToggled - Determines whether the accordion is initially toggled open or closed. Default is false.
 * @param label - The label text to be displayed on the accordion button.
 * @param labelClassName - Additional CSS class name for the label element.
 * @param buttonClassName - Additional CSS class name for the button element.
 * @param className - Additional CSS class name for the accordion container.
 */

import { ExtendedComponentProps } from '@/types/types';
import AnimateHeight from 'react-animate-height';
import { useState } from 'react';
import { CaretUp, CaretDown } from '@/components/icons';

type AccordionProps = {
  children?: JSX.Element;
  label?: string;
  labelClassName?: string;
  buttonClassName?: string;
  startToggled?: boolean;
  onClick?: () => void;
} & ExtendedComponentProps;

const Accordion = ({
  children,
  startToggled = false,
  label = '',
  labelClassName = '',
  buttonClassName = '',
  className = '',
  onClick = () => {},
}: AccordionProps) => {
  const [toggled, setToggled] = useState(startToggled);

  return (
    <div className={className}>
      <button
        className={`flex w-full items-center justify-between rounded-xl p-2 ${buttonClassName}`}
        onClick={() => {
          setToggled(!toggled);
          onClick();
        }}
      >
        <div className={labelClassName}>{label}</div>
        <div className='mx-5 flex items-center gap-2 fill-slate-600 text-xs font-medium text-slate-600'>
          {toggled ? (
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
      <AnimateHeight duration={400} height={toggled ? 'auto' : 0}>
        {children}
      </AnimateHeight>
    </div>
  );
};
export default Accordion;
