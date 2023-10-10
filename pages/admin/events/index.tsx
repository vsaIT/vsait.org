import {
  AdminLayout,
  AdminTable,
  AdminTablePagination,
} from '@lib/components/Admin';
import {
  Button,
  DebouncedInput,
  IndeterminateCheckbox,
} from '@lib/components/Input';
import { CircleCheck, CircleXMark, Search } from '@lib/icons';
import { EventType } from '@lib/types';
import { getLocaleDatetimeString } from '@lib/utils';
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
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const AdminEvents: NextPage = () => {
  const { isLoading, error, isFetching, data } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetch('/api/events/?all=true').then((res) => res.json()),
    keepPreviousData: true,
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
          <div className="w-full h-full flex justify-center items-center">
            {/* @ts-expect-error Server Component */}
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
          <div className="w-full h-full flex justify-center items-center">
            {/* @ts-expect-error Server Component */}
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
              {/* @ts-expect-error Server Component */}
              <Link
                href={`/admin/events/${info.getValue().id}`}
                className="inline-block min-w-[180px] font-medium text-primary hover:brightness-75 transition-all"
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
                {/* @ts-expect-error Server Component */}
                <CircleCheck
                  className="w-[14px] h-[14px] fill-[#70BF2B]"
                  color="inherit"
                />
              </>
            ) : (
              <>
                {/* @ts-expect-error Server Component */}
                <CircleXMark
                  className="w-[14px] h-[14px] fill-[#D5564D]"
                  color="inherit"
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
                  {/* @ts-expect-error Server Component */}
                  <CircleCheck
                    className="w-[14px] h-[14px] fill-[#70BF2B]"
                    color="inherit"
                  />
                </>
              ) : (
                <>
                  {/* @ts-expect-error Server Component */}
                  <CircleXMark
                    className="w-[14px] h-[14px] fill-[#D5564D]"
                    color="inherit"
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
    []
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
      {/* @ts-expect-error Server Component */}
      <AdminLayout>
        <>
          <div className="flex flex-col p-6 w-full gap-6 h-screen">
            <div className="flex w-full gap-6 bg-white p-6 rounded-xl justify-between">
              <div className="flex flex-col">
                <h1 className="text-xl font-medium">Arrangementer</h1>
                <p className="text-sm">Se og endre arrangementer her</p>
              </div>
              <div className="relative w-96">
                <div className="mt-1 relative fill-stone-400">
                  {/* @ts-expect-error Server Component */}
                  <DebouncedInput
                    type="text"
                    value={
                      (table.getColumn('title')?.getFilterValue() as string) ??
                      ''
                    }
                    onChange={(value) =>
                      table.getColumn('title')?.setFilterValue(String(value))
                    }
                    placeholder="Søk etter arrangementer"
                    className="w-full py-2 px-4 pl-10 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                  />
                  {/* @ts-expect-error Server Component */}
                  <Search
                    className="w-4 h-4 absolute top-[13px] left-4"
                    color="inherit"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl w-full h-full p-6">
              <div className="flex justify-between items-center pb-6">
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
                {/* @ts-expect-error Server Component */}
                <Link href="/admin/events/new">
                  {/* @ts-expect-error Server Component */}
                  <Button
                    text="Legg til nytt arrangement"
                    className="text-xs py-3 px-8"
                  />
                </Link>
              </div>
              <div className="grid [grid-template-rows:minmax(409px,1fr)_50px]">
                <div className="rounded-lg border border-neutral-300 overflow-hidden">
                  {/* @ts-expect-error Server Component */}
                  <AdminTable table={table} />
                </div>
                <div className="flex justify-between items-end gap-2">
                  <p className="flex items-center gap-1 text-sm">
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
                  {/* @ts-expect-error Server Component */}
                  <AdminTablePagination table={table} />
                </div>
              </div>
            </div>
          </div>
        </>
      </AdminLayout>
    </>
  );
};

export default AdminEvents;
