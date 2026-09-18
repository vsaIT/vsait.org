'use client';
import { ChevronDown } from '@/components/icons';
import { useScrolledPast } from '@/lib/hooks/useScrolledPast';

//How far down the page the button waits before showing itself
const SHOW_AFTER = 400;

type BackToTopProps = {
  targetId?: string;
};

// Floating button back to the top of the page
export default function BackToTop({ targetId }: BackToTopProps) {
  const visible = useScrolledPast(SHOW_AFTER, targetId);

  const scrollToTop = () => {
    // The same reduced-motion preference the section reveals respect
    const behavior: ScrollBehavior = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
      ? 'auto'
      : 'smooth';

    const target = targetId ? document.getElementById(targetId) : null;
    if (target) target.scrollTo({ top: 0, behavior });
    else window.scrollTo({ top: 0, behavior });
  };

  return (
    <button
      type='button'
      onClick={scrollToTop}
      aria-label='Til toppen'
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-all duration-300 hover:brightness-90 sm:bottom-8 sm:right-8 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ChevronDown className='h-3.5 w-3.5 rotate-180' color='currentColor' />
    </button>
  );
}
