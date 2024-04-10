'use client';

import React from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import {
  ColumnDef,
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Artwork } from '@/types/Artworks';
import Header from './header';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<Artwork, TValue>[];
  data: Artwork[];
  totalItems: number;
  isLoading?: boolean;
  skeletonColumns?: ColumnDef<TData, TValue>[];
}

function DataTable<TData, TValue>({
  isLoading,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [rowSelection, setRowSelection] = React.useState({});

  const memoizedColumns = React.useMemo(
    () => (columns),
    [columns, isLoading,],
  );
  const memoizedData = React.useMemo(() => (isLoading ? Array(5).fill({}) : data), [data, isLoading]);

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div>
      <h2 className='text-[2rem]'>
        Artists
      </h2>
      <Header />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-normal !py-3">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="group hover:bg-bg-light-grey"
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;

