import { AdminLayout, AdminTablePagination } from '@lib/components/Admin';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Button,
  DebouncedInput,
  IndeterminateCheckbox,
} from '@components/Input';
import React, { useEffect, useMemo, useState } from 'react';
import { CircleCheck, CircleXMark, Search } from '@lib/icons';
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { AdminTable } from '@components/Admin';
import { getLocaleDateString, getMembershipYear, normalize } from '@lib/utils';
import type { User } from '@prisma/client';
import { Membership } from '@prisma/client';
import { useSession } from 'next-auth/react';

type AdminUserType = User & { membership: Membership[] };

const AdminUsers: NextPage = () => {
  const { data: session } = useSession({
    required: true,
  });
  const [users, setUsers] = useState<AdminUserType[]>([]);
  const fetchUser = async () => {
    const response = await fetch('/api/user');
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const users = await response.json();
    return users;
  };

  useEffect(() => {
    if (!session?.user?.id) return;

    fetchUser()
      .then((users) => setUsers(users))
      .catch((error) => {
        error.message;
        window.location.href = '/500';
      });
  }, [session?.user?.id]);

  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'createdAt',
      desc: true,
    },
  ]);

  // Midlertidig testdata

  const columnHelper = createColumnHelper<Partial<AdminUserType>>();
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
                className: '[filter:hue-rotate(140deg)_saturate(0.85)]',
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
                className: '[filter:hue-rotate(140deg)_saturate(0.85)]',
              }}
            />
          </div>
        ),
      }),
      columnHelper.accessor(
        (row) => {
          return { id: row.id, firstName: row.firstName };
        },
        {
          id: 'firstName',
          header: () => 'Fornavn',
          cell: (info) => (
            <Link href={`/admin/users/${info.getValue().id}`}>
              <a className="inline-block min-w-[180px] font-medium text-primary hover:brightness-75 transition-all">
                {info.getValue().firstName}
              </a>
            </Link>
          ),
          footer: (info) => info.column.id,
          filterFn: (row, columnId, value: string) => {
            const accessor = row.getValue(columnId) as {
              id: string;
              firstName: string;
            };
            return normalize(accessor.firstName.toLowerCase()).includes(
              normalize(value.toLowerCase())
            );
          },
        }
      ),
      columnHelper.accessor('lastName', {
        id: 'lastName',
        header: () => 'Etternavn',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('email', {
        id: 'email',
        header: () => 'E-post',
        cell: (info) => info.getValue(),

        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('birthdate', {
        id: 'birthdate',
        header: () => 'Fødselsdato',
        cell: (info) => (
          <span>{getLocaleDateString(info.getValue() as Date)}</span>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('createdAt', {
        id: 'createdAt',
        header: () => 'Registeringsdato',
        cell: (info) => (
          <span>{getLocaleDateString(info.getValue() as Date)}</span>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('student', {
        id: 'student',
        header: () => 'Student',
        cell: (info) => (
          <span>
            {info.getValue() !== 'Non-student' ? (
              <CircleCheck
                className="w-[14px] h-[14px] fill-[#70BF2B]"
                color="inherit"
              />
            ) : (
              <CircleXMark
                className="w-[14px] h-[14px] fill-[#D5564D]"
                color="inherit"
              />
            )}
          </span>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('membership', {
        id: 'membership',
        header: () => 'Medlemskap',
        cell: (info) => (
          <span>
            {(info.getValue() || []).some(
              ({ year }) => year === getMembershipYear()
            ) ? (
              <CircleCheck
                className="w-[14px] h-[14px] fill-[#70BF2B]"
                color="inherit"
              />
            ) : (
              <CircleXMark
                className="w-[14px] h-[14px] fill-[#D5564D]"
                color="inherit"
              />
            )}
          </span>
        ),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor('role', {
        id: 'role',
        header: () => 'Admin',
        cell: (info) => (
          <span>
            {info.getValue() === 'ADMIN' ? (
              <CircleCheck
                className="w-[14px] h-[14px] fill-[#70BF2B]"
                color="inherit"
              />
            ) : (
              <CircleXMark
                className="w-[14px] h-[14px] fill-[#D5564D]"
                color="inherit"
              />
            )}
          </span>
        ),
        footer: (info) => info.column.id,
      }),
    ],
    []
  );
  const table = useReactTable({
    data: users,

    columns: columns,
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

  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>VSAiT | Administrasjon brukere</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center">
        <AdminLayout>
          <>
            <div className="flex flex-col w-full p-6 gap-6 h-screen">
              <div className="flex w-full gap-6 bg-white p-6 rounded-xl justify-between">
                <div className="flex flex-col">
                  <h1 className="text-xl font-medium">Brukere</h1>
                  <p className="text-sm">Se og endre brukere her</p>
                </div>
                <div className="relative w-96">
                  <div className="mt-1 relative fill-stone-400">
                    <DebouncedInput
                      type="text"
                      value={
                        (table
                          .getColumn('firstName')
                          .getFilterValue() as string) ?? ''
                      }
                      onChange={(value) =>
                        table
                          .getColumn('firstName')
                          .setFilterValue(String(value))
                      }
                      placeholder="Søk etter bruker"
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
                  <Link href="/admin/users/new">
                    <a>
                      <Button
                        text="Legg til bruker"
                        className="text-xs py-3 px-8"
                      />
                    </a>
                  </Link>
                </div>
                <div className="grid [grid-template-rows:minmax(409px,1fr)_50px]">
                  <div className="rounded-lg border border-neutral-300 overflow-hidden">
                    <AdminTable table={table} />
                  </div>
                  <div className="flex justify-between items-end gap-2">
                    <p className="flex items-center gap-1 text-sm">
                      Viser
                      <strong>
                        {1 + pageIndex * pageSize} -{' '}
                        {pageIndex + 1 == pageCount
                          ? users?.length
                          : (pageIndex + 1) * pageSize}{' '}
                        av {users?.length}
                      </strong>
                      brukere
                    </p>
                    <AdminTablePagination table={table} />
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

export default AdminUsers;
