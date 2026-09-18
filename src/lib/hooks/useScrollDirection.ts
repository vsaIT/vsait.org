import { useEffect, useState } from 'react';

const DEAD_ZONE = 6;

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let previous = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      if (Math.abs(current - previous) < DEAD_ZONE) return;
      setDirection(current > previous ? 'down' : 'up');
      previous = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return direction;
}
