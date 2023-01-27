import type { NextPage } from 'next';
import Head from 'next/head';
import { Navigation } from '@lib/components/Navigation';
import { AdminLayout } from '@lib/components/Admin';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { EventType } from '@lib/types';
import { getLocaleDateString } from '@lib/utils';
import {
  Button,
  DebouncedInput,
  IndeterminateCheckbox,
} from '@lib/components/Input';
import React, { useMemo } from 'react';
import { CaretDown, CaretLeft, CaretRight, CaretUp, Search } from '@lib/icons';

const AdminEvents: NextPage = () => {
  const { isLoading, error, isFetching, data } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetch('/api/events/?all=true').then((res) => res.json()),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'startTime', desc: true },
  ]);
  const columnHelper = createColumnHelper<EventType>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: () => (
          <div className="w-full h-full flex justify-center items-center">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="w-full h-full flex justify-center items-center">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      }),
      columnHelper.accessor('title', {
        id: 'title',
        header: () => 'Tittel',
        cell: (info) => (
          <span className="inline-block min-w-[180px]">{info.getValue()}</span>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('startTime', {
        id: 'startTime',
        header: () => 'Starttid',
        cell: (info) => <span>{getLocaleDateString(info.getValue())}</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('endTime', {
        id: 'endTime',
        header: () => 'Sluttid',
        cell: (info) => <span>{getLocaleDateString(info.getValue())}</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('updatedAt', {
        id: 'lastEdited',
        header: () => <span>Sist endret</span>,
        cell: (info) => <span>{getLocaleDateString(info.getValue())}</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('startTime', {
        id: 'upcoming',
        header: () => 'Kommende',
        cell: (info) => (
          <span>{new Date(info.getValue()) > new Date() ? 'yes' : 'no'}</span>
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
              new Date(info.getValue().endTime) > new Date()
                ? 'yes'
                : 'no'}
            </span>
          ),
          footer: (info) => info.column.id,
        }
      ),
      columnHelper.accessor('isDraft', {
        id: 'draft',
        header: () => 'Utkast',
        cell: (info) => <span>{info.getValue() ? 'yes' : 'no'}</span>,
        footer: (info) => info.column.id,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: data?.events || [],
    columns: columns,
    state: {
      rowSelection,
      sorting,
      globalFilter,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
    initialState: { pagination: { pageIndex: 0, pageSize: 9 } },
  });

  const events: EventType[] = data?.events;
  const loading = isLoading || isFetching;

  // Redirect to 404 if event not found
  if (!loading && events.length === 0) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Administrasjon arrangementer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="flex w-full flex-1 flex-col items-center">
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
                    <DebouncedInput
                      type="text"
                      value={globalFilter ?? ''}
                      onChange={(value) => setGlobalFilter(String(value))}
                      placeholder="Søk etter arrangementer"
                      className="w-full py-2 px-4 pl-10 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                    />
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
                  <Button
                    text="Legg til nytt arrangement"
                    className="text-xs py-3 px-8"
                  ></Button>
                </div>
                <div className="grid [grid-template-rows:minmax(409px,1fr)_50px]">
                  <div className="rounded-lg border border-neutral-300 overflow-hidden">
                    <table className="w-full rounded-xl text-sm">
                      <thead className="bg-neutral-100 text-left">
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr
                            key={headerGroup.id}
                            className="border-neutral-300 box-border border-collapse"
                          >
                            {headerGroup.headers.map((header) => {
                              return (
                                <th
                                  key={header.id}
                                  colSpan={header.colSpan}
                                  className={`font-medium p-[0.625rem] transition-all ${
                                    ['asc', 'desc'].includes(
                                      header.column.getIsSorted() as string
                                    )
                                      ? 'bg-neutral-200 bg-opacity-80'
                                      : ''
                                  }`}
                                >
                                  {header.isPlaceholder ? null : (
                                    <div
                                      className={`flex justify-between items-center fill-neutral-700 ${
                                        header.column.getCanSort()
                                          ? 'cursor-pointer select-none'
                                          : ''
                                      }`}
                                      onClick={header.column.getToggleSortingHandler()}
                                    >
                                      {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                      {header.column.getCanSort() ? (
                                        header.column.getIsSorted() ===
                                        'asc' ? (
                                          <CaretUp
                                            className="h-3 w-3"
                                            color="inherit"
                                          />
                                        ) : header.column.getIsSorted() ===
                                          'desc' ? (
                                          <CaretDown
                                            className="h-3 w-3"
                                            color="inherit"
                                          />
                                        ) : (
                                          <div className="flex flex-col fill-neutral-400">
                                            <CaretUp
                                              className="h-3 w-3 -mb-[2.5px]"
                                              color="inherit"
                                            />
                                            <CaretDown
                                              className="h-3 w-3 -mt-[2.5px]"
                                              color="inherit"
                                            />
                                          </div>
                                        )
                                      ) : null}
                                    </div>
                                  )}
                                </th>
                              );
                            })}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        {table.getRowModel().rows.map((row) => {
                          return (
                            <tr
                              key={row.id}
                              className="border-t-[1px] border-neutral-300 border-collapse"
                            >
                              {row.getVisibleCells().map((cell) => {
                                return (
                                  <td key={cell.id} className="p-[0.625rem]">
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
                    <div className="flex items-center gap-2">
                      <button
                        className="inline-flex justify-center items-center text-black rounded-md p-2 h-7 w-7 bg-neutral-100 hover:bg-neutral-200 disabled:opacity-20 transition-all duration-300"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                      >
                        <CaretLeft className="h-4 w-4" />
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
                              className={`inline-flex justify-center items-center text-black rounded-md p-2 h-7 w-7 bg-neutral-100 transition-all duration-300 ${
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
                        className="inline-flex justify-center items-center text-black rounded-md p-2 h-7 w-7 bg-neutral-100 hover:bg-neutral-200 disabled:opacity-20 transition-all duration-300"
                        onClick={() =>
                          table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                      >
                        <CaretRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </AdminLayout>
      </main>
    </div>
  );
};

export default AdminEvents;
