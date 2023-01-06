import { AccordionProps } from '@lib/types';
import AnimateHeight from 'react-animate-height';
import { useState } from 'react';
import CaretUp from '@lib/icons/CaretUp';
import CaretDown from '@lib/icons/CaretDown';

const Accordion = ({ children, className = '' }: AccordionProps) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className={className} onClick={() => setToggled(!toggled)}>
      <button className="p-2 w-full rounded-xl flex justify-end">
        <div className="flex mx-5 opacity-60 gap-2 items-center text-xs">
          {toggled ? (
            <>
              Close <CaretUp />
            </>
          ) : (
            <>
              Open
              <CaretDown />
            </>
          )}
        </div>
      </button>
      <AnimateHeight duration={500} height={toggled ? 'auto' : 0}>
        {children}
      </AnimateHeight>
    </div>
  );
};
export default Accordion;
