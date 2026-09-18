import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from '@/components/icons';

type EventsPaginationProps = {
  page: number;
  pages: number;
  onChange: (page: number) => void;
};

const buttonClass =
  'flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-gray shadow-sm transition-all duration-300 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-gray sm:h-10 sm:w-10';

const iconClass = 'h-3 w-auto sm:h-3.5';

const EventsPagination = ({ page, pages, onChange }: EventsPaginationProps) => {
  if (pages <= 1) return null;

  // A sliding window of at most 5 page numbers around the current page.
  const windowSize = Math.min(5, pages);
  const windowEnd = Math.min(
    pages,
    Math.max(page + Math.floor(windowSize / 2), windowSize)
  );
  const windowStart = windowEnd - windowSize + 1;
  const pageNumbers = Array.from(
    { length: windowSize },
    (_, i) => windowStart + i
  );
  const showJumps = pages > windowSize;

  return (
    <div className='mt-10 flex flex-wrap items-center justify-center gap-1 sm:gap-2'>
      {showJumps && (
        <button
          type='button'
          onClick={() => onChange(1)}
          disabled={page === 1}
          aria-label='Første side'
          className={buttonClass}
        >
          <CaretDoubleLeft className={iconClass} />
        </button>
      )}

      <button
        type='button'
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label='Forrige side'
        className={buttonClass}
      >
        <CaretLeft className={iconClass} />
      </button>

      {pageNumbers.map((number) => (
        <button
          type='button'
          key={`events-pagination-${number}`}
          onClick={() => onChange(number)}
          aria-current={page === number ? 'page' : undefined}
          className={`${buttonClass} ${
            page === number ? '!bg-primary !text-white' : ''
          }`}
        >
          {number}
        </button>
      ))}

      <button
        type='button'
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        aria-label='Neste side'
        className={buttonClass}
      >
        <CaretRight className={iconClass} />
      </button>

      {showJumps && (
        <button
          type='button'
          onClick={() => onChange(pages)}
          disabled={page === pages}
          aria-label='Siste side'
          className={buttonClass}
        >
          <CaretDoubleRight className={iconClass} />
        </button>
      )}
    </div>
  );
};
export default EventsPagination;
