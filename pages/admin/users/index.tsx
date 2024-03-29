import { AdminTable } from '@components/Admin';
import {
  Button,
  DebouncedInput,
  IndeterminateCheckbox,
} from '@components/Input';
import { AdminLayout, AdminTablePagination } from '@lib/components/Admin';
import { CircleCheck, CircleXMark, Search } from '@lib/icons';
import { getLocaleDateString, getMembershipYear, normalize } from '@lib/utils';
import type { User } from '@prisma/client';
import { Membership } from '@prisma/client';
import {
  ColumnFiltersState,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type AdminUserType = User & { membership: Membership[] };

const fetchUser = async (page: number) => {
  const response = await fetch(`/api/user?page=${page + 1}`);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const users = await response.json();
  return users;
};
const AdminUsers: NextPage = () => {
  const { data: session } = useSession({
    required: true,
  });
  const [users, setUsers] = useState<{
    users: AdminUserType[];
    userCount: number;
  }>({
    users: [],
    userCount: 0,
  });

  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'createdAt',
      desc: true,
    },
  ]);

  const columnHelper = createColumnHelper<AdminUserType>();

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
          return { id: row.id, firstName: row.firstName };
        },
        {
          id: 'firstName',
          header: () => 'Fornavn',
          cell: (info) => (
            <>
              {/* @ts-expect-error Server Component */}
              <Link
                href={`/admin/users/${info.getValue().id}`}
                className="inline-block min-w-[180px] font-medium text-primary hover:brightness-75 transition-all"
              >
                {info.getValue().firstName}
              </Link>
            </>
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
      columnHelper.accessor('membership', {
        id: 'membership',
        header: () => 'Medlemskap',
        cell: (info) => (
          <span>
            {(info.getValue() || []).some(
              ({ year }) => year === getMembershipYear()
            ) ? (
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
      columnHelper.accessor('role', {
        id: 'role',
        header: () => 'Admin',
        cell: (info) => (
          <span>
            {info.getValue() === 'ADMIN' ? (
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
    ],
    []
  );
  const table = useReactTable({
    data: users.users,

    columns: columns,
    initialState: { pagination: { pageIndex: 0, pageSize: 9 } },
    state: {
      rowSelection,
      sorting,
      columnFilters,
    },
    pageCount: Math.ceil(users.userCount / 9),
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  useEffect(() => {
    if (!session?.user?.id) return;

    fetchUser(pageIndex)
      .then((users) => setUsers(users))
      .catch((error) => {
        error.message;
        window.location.href = '/500';
      });
  }, [session?.user?.id, pageIndex, fetchUser]);

  return (
    <>
      {/* @ts-expect-error Server Component */}
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
                  {/* @ts-expect-error Server Component */}
                  <DebouncedInput
                    type="text"
                    value={
                      (table
                        .getColumn('firstName')
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(value) =>
                      table
                        .getColumn('firstName')
                        ?.setFilterValue(String(value))
                    }
                    placeholder="Søk etter bruker"
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
                <Link href="/admin/users/new">
                  {/* @ts-expect-error Server Component */}
                  <Button
                    text="Legg til bruker"
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
                        ? users?.userCount
                        : (pageIndex + 1) * pageSize}{' '}
                      av {users?.userCount}
                    </strong>
                    brukere
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

export default AdminUsers;
