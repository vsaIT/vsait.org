import { ExtendedComponentProps } from 'src/lib/types';
import AnimateHeight from 'react-animate-height';
import { useState } from 'react';
import { CaretUp, CaretDown } from 'src/lib/icons';

type AccordionProps = {
  children?: JSX.Element;
  label?: string;
  labelClassName?: string;
  buttonClassName?: string;
  startToggled?: boolean;
} & ExtendedComponentProps;

const Accordion = ({
  children,
  startToggled = false,
  label = '',
  labelClassName = '',
  buttonClassName = '',
  className = '',
}: AccordionProps) => {
  const [toggled, setToggled] = useState(startToggled);

  return (
    <div className={className} onClick={() => setToggled(!toggled)}>
      <button
        className={`flex justify-between items-center p-2 w-full rounded-xl flex justify-end ${buttonClassName}`}
      >
        <div className={labelClassName}>{label}</div>
        <div className="flex mx-5 gap-2 items-center text-xs text-slate-600 fill-slate-600 font-medium">
          {toggled ? (
            <>
              Lukke <CaretUp color="inherit" />
            </>
          ) : (
            <>
              Åpne
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
export default Accordion;
