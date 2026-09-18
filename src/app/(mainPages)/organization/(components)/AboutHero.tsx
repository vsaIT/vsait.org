'use client';
import { useEffect, useRef } from 'react';

export default function AboutHero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const content = contentRef.current;
      if (!content) return;
      // 0 at the top of the page, 1 once a full screen has been scrolled past
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      content.style.transform = `translateY(${-progress * 8}vh)`;
      content.style.opacity = String(Math.max(1 - progress * 1.4, 0));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className='sticky top-0 z-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary px-6 pt-20'>
      <div
        ref={contentRef}
        className='flex flex-col items-center will-change-transform'
      >
        <h1 className='text-5xl tracking-wide text-white sm:text-6xl'>Om oss</h1>
        <p className='mt-4 max-w-md text-sm text-white/85 sm:text-base'>
          Kultur, fellesskap og vennskap — siden 1990.
        </p>
      </div>
    </header>
  );
}
