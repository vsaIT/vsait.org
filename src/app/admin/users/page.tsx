'use client';
import { AdminTable, AdminTablePagination } from '@/components/Admin';
import {
  Button,
  DebouncedInput,
  IndeterminateCheckbox,
} from '@/components/Input';
import { CircleCheck, CircleXMark, Search } from '@/components/icons';
import { getLocaleDateString, getMembershipYear, normalize } from '@/lib/utils';
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
        header: (props) => (
          <div className='flex h-full w-full items-center justify-center'>
            <IndeterminateCheckbox
              {...{
                checked: props.table.getIsAllRowsSelected(),
                indeterminate: props.table.getIsSomeRowsSelected(),
                onChange: props.table.getToggleAllRowsSelectedHandler(),
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
          return { id: row.id, firstName: row.firstName };
        },
        {
          id: 'firstName',
          header: () => 'Fornavn',
          cell: (info) => (
            <>
              <Link
                href={`/admin/users/${info.getValue().id}`}
                className='inline-block min-w-[180px] font-medium text-primary transition-all hover:brightness-75'
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
      columnHelper.accessor('membership', {
        id: 'membership',
        header: () => 'Medlemskap',
        cell: (info) => (
          <span>
            {(info.getValue() || []).some(
              ({ year }) => year === getMembershipYear()
            ) ? (
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
      columnHelper.accessor('role', {
        id: 'role',
        header: () => 'Admin',
        cell: (info) => (
          <span>
            {info.getValue() === 'ADMIN' ? (
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
    ],
    [columnHelper]
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
  }, [session?.user?.id, pageIndex]);

  return (
    <>
      <div className='flex h-screen w-full flex-col gap-6 p-6'>
        <div className='flex w-full justify-between gap-6 rounded-xl bg-white p-6'>
          <div className='flex flex-col'>
            <h1 className='text-xl font-medium'>Brukere</h1>
            <p className='text-sm'>Se og endre brukere her</p>
          </div>
          <div className='relative w-96'>
            <div className='relative mt-1 fill-stone-400'>
              <DebouncedInput
                type='text'
                value={
                  (table.getColumn('firstName')?.getFilterValue() as string) ??
                  ''
                }
                onChange={(value) =>
                  table.getColumn('firstName')?.setFilterValue(String(value))
                }
                placeholder='Søk etter bruker'
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

            <Link href='/admin/users/new'>
              <Button text='Legg til bruker' className='px-8 py-3 text-xs' />
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
                    ? users?.userCount
                    : (pageIndex + 1) * pageSize}{' '}
                  av {users?.userCount}
                </strong>
                brukere
              </p>

              <AdminTablePagination table={table} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
