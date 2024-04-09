'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Artists } from '@/types/Artists';
import { cn } from '../../lib/utils';


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
    header: 'DisplayName',
    cell: ({ row }) => {
      return <div className="w-max flex gap-6 ">{row.original.DisplayName}</div>;
    },
  },

  {
    header: 'ArtistBio',
    cell: ({ row }) => {
      return (
        <div className="w-max flex gap-6 ">{row.original.ArtistBio}</div>
      );
    },
  },

  {
    header: 'Nationality',
    cell: ({ row }) => {
      return (
        <div className="w-max flex gap-6 ">{row.original.Nationality}</div>
      );
    },
  },
  {
    header: 'Gender',
    cell: ({ row }) => {
      return (
        <div className="w-max flex gap-6 ">{row.original.Gender}</div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: () => {
      return (
        <div
          className="w-max flex items-center gap-x-3"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* preview link */}
          <a
            href={`#`}
            className={cn([
              'hover:bg-black-10 p-1 rounded',
              'opacity-0 group-hover:opacity-100',
            ])}
          >
            eye
          </a>

          {/* edit watch */}

          {/* action dropdown */}
        </div>
      );
    },
  },
];


export { columns, };

