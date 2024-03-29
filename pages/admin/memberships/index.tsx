import {
  AdminLayout,
  AdminTable,
  AdminTablePagination,
} from '@lib/components/Admin';
import { DebouncedInput, IndeterminateCheckbox } from '@lib/components/Input';
import { Search } from '@lib/icons';
import { Membership } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const AdminMemberships: NextPage = () => {
  const { isLoading, error, isFetching, data } = useQuery({
    queryKey: ['memberships'],
    queryFn: () => fetch('/api/memberships').then((res) => res.json()),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60000,
  });
  // Selection, filter and sorting states
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  // Column creation through tanstack column helper for strictly typing header and cells
  const columnHelper = createColumnHelper<
    Membership & { users: { id: string }[] }
  >();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: () => (
          <div className="max-w-[40px] w-full h-full flex justify-center items-center">
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
          <div className="max-w-[40px] w-full h-full flex justify-center items-center">
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
      columnHelper.accessor((row) => String(row.year), {
        id: 'year',
        header: () => 'Medlemskap',
        cell: (info) => (
          <>
            {/* @ts-expect-error Server Component */}
            <Link
              href={`/admin/memberships/${info.getValue()}`}
              className="inline-block min-w-[180px] font-medium text-primary hover:brightness-75 transition-all"
            >
              {info.getValue()}
            </Link>
          </>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.users.length, {
        id: 'total-members',
        header: () => 'Registrerte',
        cell: (info) => <span>{info.getValue()}</span>,
        size: 40,
        footer: (info) => info.column.id,
      }),
    ],
    []
  );

  // Create table
  const table = useReactTable({
    data: data || [],
    columns: columns,
    // States
    initialState: { pagination: { pageIndex: 0, pageSize: 9 } },
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
  });

  // Variables for reusability
  const memberships: (Membership & { users: { id: string }[] })[] = data;
  const loading = isLoading || isFetching;
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  // Redirect to 404 if event not found
  if (!loading && memberships.length === 0) window.location.href = '/404';
  // Redirect to 500 if error
  if (error) window.location.href = '/500';

  console.log(memberships);

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AdminLayout>
        <>
          <div className="flex flex-col p-6 w-full gap-6 h-screen">
            <div className="flex w-full gap-6 bg-white p-6 rounded-xl justify-between">
              <div className="flex flex-col">
                <h1 className="text-xl font-medium">Medlemskap</h1>
                <p className="text-sm">Se og endre medlemskap her</p>
              </div>
              <div className="relative w-96">
                <div className="mt-1 relative fill-stone-400">
                  {/* @ts-expect-error Server Component */}
                  <DebouncedInput
                    type="text"
                    value={globalFilter ?? ''}
                    onChange={(value) => setGlobalFilter(String(value))}
                    placeholder="Søk etter medlemskapsår"
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
              <div className="flex justify-between items-center pb-6 h-16">
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
                        ? memberships?.length
                        : (pageIndex + 1) * pageSize}{' '}
                      av {memberships?.length}
                    </strong>
                    medlemskap
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

export default AdminMemberships;
