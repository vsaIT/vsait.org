'use client';
import { AdminTable, AdminTablePagination } from '@/components/Admin';
import {
  Button,
  DebouncedInput,
  IndeterminateCheckbox,
} from '@/components/Input';
import { CircleCheck, CircleXMark, Search } from '@/components/icons';
import { getLocaleDatetimeString } from '@/lib/utils';
import { EventType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import {
  ColumnFiltersState,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { useMemo, useState } from 'react';

function AdminEvents(): JSX.Element {
  const { isLoading, error, isFetching, data } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetch('/api/events/?all=true').then((res) => res.json()),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });
  // Selection, filter and sorting states
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'startTime', desc: true },
  ]);
  // Column creation through tanstack column helper for strictly typing header and cells
  const columnHelper = createColumnHelper<EventType>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: () => (
          <div className='flex h-full w-full items-center justify-center'>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
                className: '[filter:hue-rotate(140deg)_saturate(0.85)]',
              }}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className='flex h-full w-full items-center justify-center'>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
                className: '[filter:hue-rotate(140deg)_saturate(0.85)]',
              }}
            />
          </div>
        ),
      }),
      columnHelper.accessor(
        (row) => {
          return { id: row.id, title: row.title };
        },
        {
          id: 'title',
          header: () => 'Tittel',
          cell: (info) => (
            <>
              <Link
                href={`/admin/events/${info.getValue().id}`}
                className='inline-block min-w-[180px] font-medium text-primary transition-all hover:brightness-75'
              >
                {info.getValue().title}
              </Link>
            </>
          ),
          footer: (info) => info.column.id,
        }
      ),
      columnHelper.accessor('startTime', {
        id: 'startTime',
        header: () => 'Starttid',
        cell: (info) => <span>{getLocaleDatetimeString(info.getValue())}</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('endTime', {
        id: 'endTime',
        header: () => 'Sluttid',
        cell: (info) => <span>{getLocaleDatetimeString(info.getValue())}</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('updatedAt', {
        id: 'lastEdited',
        header: () => <span>Sist endret</span>,
        cell: (info) => <span>{getLocaleDatetimeString(info.getValue())}</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('startTime', {
        id: 'upcoming',
        header: () => 'Kommende',
        cell: (info) => (
          <span>
            {new Date(info.getValue()) > new Date() ? (
              <>
                <CircleCheck
                  className='h-[14px] w-[14px] fill-[#70BF2B]'
                  color='inherit'
                />
              </>
            ) : (
              <>
                <CircleXMark
                  className='h-[14px] w-[14px] fill-[#D5564D]'
                  color='inherit'
                />
              </>
            )}
          </span>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor(
        (row) => {
          return { startTime: row.startTime, endTime: row.endTime };
        },
        {
          id: 'ongoing',
          header: () => 'Gående',
          cell: (info) => (
            <span>
              {new Date(info.getValue().startTime) <= new Date() &&
              new Date(info.getValue().endTime) > new Date() ? (
                <>
                  <CircleCheck
                    className='h-[14px] w-[14px] fill-[#70BF2B]'
                    color='inherit'
                  />
                </>
              ) : (
                <>
                  <CircleXMark
                    className='h-[14px] w-[14px] fill-[#D5564D]'
                    color='inherit'
                  />
                </>
              )}
            </span>
          ),
          footer: (info) => info.column.id,
        }
      ),
      columnHelper.accessor(
        (row) => {
          return { isDraft: row.isDraft, isCancelled: row.isCancelled };
        },
        {
          id: 'status',
          header: () => 'Status',
          cell: (info) => (
            <span>
              {info.getValue().isDraft
                ? 'utkast'
                : info.getValue().isCancelled
                  ? 'avlyst'
                  : 'åpen'}
            </span>
          ),
          footer: (info) => info.column.id,
        }
      ),
    ],
    [columnHelper]
  );

  // Create table
  const table = useReactTable({
    data: data?.events || [],
    columns: columns,
    // States
    initialState: { pagination: { pageIndex: 0, pageSize: 9 } },
    state: {
      rowSelection,
      sorting,
      columnFilters,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  // Variables for reusability
  const events: EventType[] = data?.events;
  const loading = isLoading || isFetching;
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  // Redirect to 404 if event not found
  if (!loading && events.length === 0) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  return (
    <>
      <div className='flex h-screen w-full flex-col gap-6 p-6'>
        <div className='flex w-full justify-between gap-6 rounded-xl bg-white p-6'>
          <div className='flex flex-col'>
            <h1 className='text-xl font-medium'>Arrangementer</h1>
            <p className='text-sm'>Se og endre arrangementer her</p>
          </div>
          <div className='relative w-96'>
            <div className='relative mt-1 fill-stone-400'>
              <DebouncedInput
                type='text'
                value={
                  (table.getColumn('title')?.getFilterValue() as string) ?? ''
                }
                onChange={(value) =>
                  table.getColumn('title')?.setFilterValue(String(value))
                }
                placeholder='Søk etter arrangementer'
                className='w-full rounded-xl border-2 border-stone-300 bg-transparent px-4 py-2 pl-10 text-left text-sm leading-6 outline-none transition duration-150 ease-in-out'
              />

              <Search
                className='absolute left-4 top-[13px] h-4 w-4'
                color='inherit'
              />
            </div>
          </div>
        </div>

        <div className='h-full w-full rounded-xl bg-white p-6'>
          <div className='flex items-center justify-between pb-6'>
            <div>
              <p
                className={`text-sm text-neutral-500 transition-all duration-500 ${
                  Object.keys(rowSelection).length > 0
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              >
                {Object.keys(rowSelection).length} av{' '}
                {table.getPreFilteredRowModel().rows.length} valgt
              </p>
            </div>

            <Link href='/admin/events/new'>
              <Button
                text='Legg til nytt arrangement'
                className='px-8 py-3 text-xs'
              />
            </Link>
          </div>
          <div className='grid [grid-template-rows:minmax(409px,1fr)_50px]'>
            <div className='overflow-hidden rounded-lg border border-neutral-300'>
              <AdminTable table={table} />
            </div>
            <div className='flex items-end justify-between gap-2'>
              <p className='flex items-center gap-1 text-sm'>
                Viser
                <strong>
                  {1 + pageIndex * pageSize} -{' '}
                  {pageIndex + 1 == pageCount
                    ? events?.length
                    : (pageIndex + 1) * pageSize}{' '}
                  av {events?.length}
                </strong>
                arrangementer
              </p>

              <AdminTablePagination table={table} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEvents;
