import { AdminLayout } from '@lib/components/Admin';
import type { NextPage } from 'next';
import Head from 'next/head';
import { DebouncedInput, IndeterminateCheckbox } from '@components/Input';
import React, { useState } from 'react';
import { Search } from '@lib/icons';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { AdminTable } from '@components/Admin';
import { UserType } from '@lib/types';
import { getLocaleDateString } from '@lib/utils';

const AdminUsers: NextPage = () => {
  const columnHelper = createColumnHelper<any>();
  const columns = [
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
          <Link href={`/`}>
            <a className="inline-block min-w-[180px] font-medium text-primary hover:brightness-75 transition-all">
              {info.getValue().firstName}
            </a>
          </Link>
        ),
        footer: (info) => info.column.id,
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
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => 'Registeringsdato',
      cell: (info) => <span>{getLocaleDateString(info.getValue())}</span>,
      footer: (info) => info.column.id,
    }),
  ];
  const table = useReactTable({
    data: [{}],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
                <div className="relative w-96 bg-amber-300">
                  <div className="mt-1 relative fill-stone-400">
                    // TODO: Debounced
                    <Search className="w-4 h-4 absolute" color="inherit" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl w-full h-full p-6">
                <div className="flex justify-between items-center pb-6">
                  legg til arran
                </div>
                <div className="grid [grid-template-rows:minmax(409px,1fr)_50px">
                  <div className="rounded-lg border border-neutral-300 overflow-hidden">
                    <AdminTable table={table} />
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
