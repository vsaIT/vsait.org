import { ChildrenProps } from '@lib/types';
import AnimateHeight from 'react-animate-height';
import { useState } from 'react';
import { CaretUp, CaretDown } from '@lib/icons';

const UserAccordion = ({ children, className = '' }: ChildrenProps) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className={className} onClick={() => setToggled(!toggled)}>
      <button className="p-2 w-full rounded-xl flex justify-end">
        <div className="flex mx-5 gap-2 items-center text-xs text-slate-600 fill-slate-600 font-medium">
          {toggled ? (
            <>
              Close <CaretUp color="inherit" />
            </>
          ) : (
            <>
              Open
              <CaretDown color="inherit" />
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
export default UserAccordion;
