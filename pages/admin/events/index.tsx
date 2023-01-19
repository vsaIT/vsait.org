import type { NextPage } from 'next';
import Head from 'next/head';
import { Navigation } from '@lib/components/Navigation';
import { AdminLayout } from '@lib/components/Admin';
import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { EventType } from '@lib/types';
import { getLocaleDateString } from '@lib/utils';
import { Button } from '@lib/components/Button';
import { useEffect } from 'react';

const AdminEvents: NextPage = () => {
  const { isLoading, error, isFetching, data } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetch('/api/events/?all=true').then((res) => res.json()),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });
  const columnHelper = createColumnHelper<EventType>();
  const columns = [
    columnHelper.accessor('title', {
      header: () => 'Tittel',
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('startTime', {
      header: () => 'Starttid',
      cell: (info) => <span>{getLocaleDateString(info.getValue())}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('endTime', {
      header: () => 'Sluttid',
      cell: (info) => <span>{getLocaleDateString(info.getValue())}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('updatedAt', {
      header: () => <span>Sist endret</span>,
      cell: (info) => <span>{getLocaleDateString(info.getValue())}</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('startTime', {
      id: 'Kommende',
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
        id: 'Gående',
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
      header: () => 'Utkast',
      cell: (info) => <span>{info.getValue() ? 'yes' : 'no'}</span>,
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data: data?.events || [],
    columns: columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    initialState: { pagination: { pageIndex: 0, pageSize: 9 } },
  });

  const events: EventType[] = data?.events;
  const loading = isLoading || isFetching;
  console.log(events);

  // Redirect to 404 if event not found
  if (!loading && events.length === 0) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

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
                  <div className="mt-1">
                    <input
                      id="search"
                      type="text"
                      placeholder="Søk etter arrangementer"
                      className="w-full py-2 px-4 border-2 border-stone-300 outline-none text-sm text-left leading-6 bg-transparent rounded-xl transition duration-150 ease-in-out"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl w-full h-full p-6">
                <div className="flex justify-end pb-6">
                  <Button
                    text="Legg til nytt arrangement"
                    className="text-xs py-3 px-8"
                  ></Button>
                </div>
                <div className="grid [grid-template-rows:minmax(409px,1fr)_50px]">
                  <div className="rounded-lg border border-neutral-300 overflow-hidden">
                    <table className="w-full rounded-xl text-xs">
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
                                  className="font-medium p-3"
                                >
                                  {header.isPlaceholder ? null : (
                                    <div>
                                      {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
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
                                  <td key={cell.id} className="p-3">
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
                    <span className="flex items-center gap-1">
                      <div>Page</div>
                      <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                      </strong>
                    </span>
                    <div>
                      <button
                        className="border rounded p-1"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                      >
                        {'<<'}
                      </button>
                      <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        {'<'}
                      </button>
                      <button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        {'>'}
                      </button>
                      <button
                        className="border rounded p-1"
                        onClick={() =>
                          table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                      >
                        {'>>'}
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
