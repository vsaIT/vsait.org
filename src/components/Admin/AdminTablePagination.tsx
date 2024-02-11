import { CaretLeft, CaretRight } from '@/components/icons';
import { AdminTableProps } from '@/types/types';

const AdminTablePagination = <T extends object>({
  table,
}: AdminTableProps<T>) => {
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;

  return (
    <div className='flex items-center gap-2'>
      <button
        className='inline-flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 p-2 text-black transition-all duration-300 hover:bg-neutral-200 disabled:opacity-20'
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <CaretLeft className='h-4 w-4' />
      </button>
      {new Array(5)
        .fill(
          Math.max(
            pageCount - pageIndex > 2
              ? pageIndex - 2
              : pageIndex - (5 - pageCount + pageIndex),
            0
          )
        )
        .map((page, i) =>
          page + i < pageCount ? (
            <button
              key={'pagination' + i}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 p-2 text-black transition-all duration-300 ${
                page + i === pageIndex
                  ? 'bg-neutral-600 !text-white'
                  : 'hover:bg-neutral-200'
              }`}
              onClick={() => table.setPageIndex(page + i)}
              disabled={page + i >= pageCount}
            >
              {page + 1 + i}
            </button>
          ) : null
        )}
      <button
        className='inline-flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 p-2 text-black transition-all duration-300 hover:bg-neutral-200 disabled:opacity-20'
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <CaretRight className='h-4 w-4' />
      </button>
    </div>
  );
};
export default AdminTablePagination;
