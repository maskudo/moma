'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Artists } from '@/types/Artists';


const columns: ColumnDef<Artists>[] = [
  {
    header: 'TITLE',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4 lg:min-w-[34.5rem]">
        <div className="relative w-12.5 h-8 shrink-0 rounded overflow-hidden">
        </div>
        <div>
          <span className="block text-b1 mb-1 line-clamp-1 max-w-[60ch]">{row.original.ConstituentID}</span>
        </div>
      </div>
    ),
  },
  {
    header: 'TYPE',
    cell: () => {
      return <div className="w-max flex gap-6 ">hello</div>;
    },
  },

  {
    header: 'SCHEDULED',
    cell: () => {
      return (
        <div className="w-max flex gap-6 ">hello</div>
      );
    },
  },

  {
    header: 'STATUS',
    cell: () => {
      return (
        <div className="w-max flex gap-6 ">hello</div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => {
      return (
        <div
          className="w-max flex items-center gap-x-3"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >

          hello
        </div>
      );
    },
  },
];


export { columns, };

