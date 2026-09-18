'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@/components/icons';
import { timelineEntries } from '../constants';

const COLUMN_TINTS = [
  'bg-primary',
  'bg-[#D9793F]',
  'bg-[#C4463D]',
  'bg-[#E0A03C]',
  'bg-[#E0705F]',
];

const DRAG_THRESHOLD = 5;

// How long a column takes to open or close
const COLUMN_TRANSITION_MS = 500;

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const centredIndex = useRef(activeIndex);
  // Distinguishes a drag of the strip from a click on a column
  const drag = useRef({ pointerId: -1, startX: 0, startScroll: 0, moved: false });

  const active = timelineEntries[activeIndex];

  useEffect(() => {
    if (centredIndex.current === activeIndex) return;
    centredIndex.current = activeIndex;

    const strip = stripRef.current;
    const column = columnRefs.current[activeIndex];
    if (!strip || !column) return;

    const centredScroll = () => {
      const stripBox = strip.getBoundingClientRect();
      const columnBox = column.getBoundingClientRect();
      return (
        strip.scrollLeft +
        columnBox.left -
        stripBox.left -
        (stripBox.width - columnBox.width) / 2
      );
    };

    const startScroll = strip.scrollLeft;
    const startTime = performance.now();
    let frame = requestAnimationFrame(function follow(now) {
      const progress = Math.min((now - startTime) / COLUMN_TRANSITION_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      strip.scrollLeft = startScroll + (centredScroll() - startScroll) * eased;
      if (progress < 1) frame = requestAnimationFrame(follow);
    });
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  const startDrag = (event: React.PointerEvent) => {
    drag.current.moved = false;
    if (event.pointerType !== 'mouse' || !stripRef.current) return;
    drag.current.pointerId = event.pointerId;
    drag.current.startX = event.clientX;
    drag.current.startScroll = stripRef.current.scrollLeft;
  };

  const moveDrag = (event: React.PointerEvent) => {
    const strip = stripRef.current;
    if (!strip || drag.current.pointerId !== event.pointerId) return;
    const travelled = event.clientX - drag.current.startX;
    if (Math.abs(travelled) > DRAG_THRESHOLD) drag.current.moved = true;
    if (drag.current.moved) {
      event.preventDefault();
      strip.scrollLeft = drag.current.startScroll - travelled;
    }
  };

  const endDrag = () => {
    drag.current.pointerId = -1;
  };

  const step = (delta: number) => {
    setActiveIndex((current) =>
      Math.min(Math.max(current + delta, 0), timelineEntries.length - 1)
    );
  };

  const openColumn = (index: number) => {
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    setActiveIndex(index);
  };

  return (
    <div>
      <p
        aria-hidden
        className='pointer-events-none mt-6 text-center text-6xl leading-none text-primary/80 sm:text-7xl lg:text-8xl'
      >
        {active.year}
      </p>

      <div className='relative mt-12 pb-5'>
        <div className='absolute inset-x-0 top-[0.625rem] h-0.5 -translate-y-1/2 rounded-full bg-primary/10' />
        <div
          className='absolute left-0 top-[0.625rem] h-0.5 -translate-y-1/2 rounded-full bg-primary/50 transition-all duration-500'
          style={{
            width: `${
              (activeIndex / (timelineEntries.length - 1)) * 100
            }%`,
          }}
        />
        <ol className='relative flex justify-between'>
          {timelineEntries.map((entry, index) => {
            const isActive = index === activeIndex;
            const isLast = index === timelineEntries.length - 1;
            const isMilestone =
              isLast ||
              (Number(entry.year) % 5 === 0 &&
                timelineEntries.length - 1 - index > 2);
            const showLabel =
              isActive || (isMilestone && Math.abs(index - activeIndex) > 2);

            return (
              <li
                key={entry.year}
                className='relative flex flex-col items-center'
              >
                <button
                  type='button'
                  onClick={() => setActiveIndex(index)}
                  aria-current={isActive ? 'true' : undefined}
                  className='flex h-5 w-2 items-center justify-center'
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'h-2 w-2 bg-primary'
                        : index < activeIndex
                          ? 'h-1.5 w-1.5 bg-secondary'
                          : 'h-1.5 w-1.5 border border-primary/40 bg-cream'
                    }`}
                  />
                  <span className='sr-only'>Vis {entry.year}</span>
                </button>
                {showLabel && (
                  <span
                    className={`absolute top-5 whitespace-nowrap text-[0.625rem] transition-colors duration-300 ${
                      isActive ? 'text-primary' : 'text-gray'
                    }`}
                  >
                    {entry.year}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className='mt-10 flex items-center gap-3'>
        <button
          type='button'
          onClick={() => step(-1)}
          disabled={activeIndex === 0}
          aria-label='Forrige år'
          className='hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-all duration-300 hover:brightness-95 disabled:pointer-events-none disabled:opacity-30 sm:flex'
        >
          <ChevronLeft className='h-4 w-4' color='currentColor' />
        </button>

        <div
          ref={stripRef}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className='flex min-w-0 flex-1 gap-3 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        >
          {timelineEntries.map((entry, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={entry.year}
                ref={(node) => {
                  columnRefs.current[index] = node;
                }}
                className={`flex shrink-0 flex-col transition-[width] duration-500 ease-out ${
                  isActive ? 'w-[85%] sm:w-[25rem]' : 'w-20'
                }`}
              >
                {isActive ? (
                  <>
                    <p className='mb-2 text-left text-lg text-primary'>
                      {entry.year}
                    </p>
                    <div className='overflow-hidden rounded-2xl bg-white shadow-sm'>
                      <div className='relative flex aspect-[3/2] items-center justify-center bg-primary/10'>
                        {entry.imageSrc ? (
                          <Image
                            src={entry.imageSrc}
                            alt={entry.imageAlt ?? `Bilde fra ${entry.year}`}
                            fill
                            sizes='(max-width: 640px) 85vw, 25rem'
                            className='object-cover'
                          />
                        ) : (
                          <span className='text-[0.625rem] uppercase tracking-[0.18em] text-primary/60'>
                            Foto fra {entry.year}
                          </span>
                        )}
                      </div>
                      <div className='p-4 text-left sm:p-5'>
                        <h3 className='text-base '>{entry.title}</h3>
                        <p className='mt-2 text-xs leading-relaxed text-gray'>
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    type='button'
                    onClick={() => openColumn(index)}
                    className={`mt-9 flex w-20 flex-1 items-center justify-center rounded-2xl text-base text-white transition-all duration-300 hover:brightness-95 sm:mt-8 sm:h-[22rem] sm:flex-none ${
                      COLUMN_TINTS[index % COLUMN_TINTS.length]
                    }`}
                  >
                    <span className='rotate-180 [writing-mode:vertical-rl]'>
                      {entry.year}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button
          type='button'
          onClick={() => step(1)}
          disabled={activeIndex === timelineEntries.length - 1}
          aria-label='Neste år'
          className='hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-all duration-300 hover:brightness-95 disabled:pointer-events-none disabled:opacity-30 sm:flex'
        >
          <ChevronRight className='h-4 w-4' color='currentColor' />
        </button>
      </div>
    </div>
  );
}
