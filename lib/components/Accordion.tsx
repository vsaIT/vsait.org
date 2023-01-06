import { AccordionProps } from '@lib/types';
import { useState } from 'react';

const Accordion = ({ children, className = '' }: AccordionProps) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div
      className={`bg-slate-400 pt-10 ${className}`}
      onClick={() => setToggled(!toggled)}
    >
      <div
        className={`overflow-hidden transition-all duration-700`}
        style={{ height: toggled ? '100%' : 0 }}
      >
        {children}
      </div>
    </div>
  );
};
export default Accordion;
