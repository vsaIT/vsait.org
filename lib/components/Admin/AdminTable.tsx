import { CaretDown, CaretUp } from '@lib/icons';
import { AdminTableProps } from '@lib/types';
import { flexRender } from '@tanstack/react-table';

const AdminTable = <T extends object>({ table }: AdminTableProps<T>) => {
  return (
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
                        header.column.getIsSorted() === 'asc' ? (
                          <CaretUp className="h-3 w-3" color="inherit" />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <CaretDown className="h-3 w-3" color="inherit" />
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default AdminTable;
