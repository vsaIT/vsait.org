'use client';
import { useInView } from 'react-intersection-observer';

// Kept as literal strings so Tailwind picks the delays up at build time
const delayClass = {
  0: '',
  100: 'delay-100',
  200: 'delay-200',
  300: 'delay-300',
} as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: keyof typeof delayClass;
  once?: boolean;
};

export default function Reveal({
  children,
  className = '',
  delay = 0,
  once = false,
}: RevealProps) {
  const { ref, inView, entry } = useInView({
    threshold: 0,
    triggerOnce: once,
    initialInView: false,
    rootMargin: '-20% 0px -20% 0px',
  });

  const rect = entry?.boundingClientRect;
  const scrolledPast = !!rect && rect.bottom <= (entry?.rootBounds?.top ?? 0);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none ${
        inView
          ? 'translate-y-0 opacity-100'
          : `opacity-0 ${scrolledPast ? '-translate-y-8' : 'translate-y-12'}`
      } ${delayClass[delay]} ${className}`}
    >
      {children}
    </div>
  );
}
