import { useEffect, useState } from 'react';

export function useScrolledPast(distance: number, targetId?: string) {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const target = targetId ? document.getElementById(targetId) : null;
    const scroller: EventTarget = target ?? window;

    const onScroll = () => {
      setScrolledPast((target ? target.scrollTop : window.scrollY) > distance);
    };

    onScroll();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [distance, targetId]);

  return scrolledPast;
}
