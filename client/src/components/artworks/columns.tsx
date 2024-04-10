'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '../../lib/utils';
import { Artwork } from '@/types/Artworks';


const columns: ColumnDef<Artwork>[] = [
  {
    header: 'TITLE',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4 lg:min-w-[34.5rem]">
        <div className="relative w-12.5 h-8 shrink-0 rounded overflow-hidden">
        </div>
        <div>
          <span className="block text-b1 mb-1 line-clamp-1 max-w-[60ch]">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    header: 'Title',
    cell: ({ row }) => {
      return <div className="w-max flex gap-6 ">{row.original.Title}</div>;
    },
  },

  {
    header: 'Artist',
    cell: ({ row }) => {
      return (
        <div className="w-max flex gap-6 ">{row.original.Title}</div>
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
    header: 'Url',
    cell: ({ row }) => {
      return (
        <div className="w-max flex gap-6 ">
          <a href={row.original.URL}>URL</a>
        </div>
      );
    },
  },
  {
    header: 'Thumbnail',
    cell: ({ row }) => {
      return (
        <div className="w-max flex gap-6 ">
          <div className='size-10'>
            <img src={row.original.ImageURL} alt="image" />
          </div>
        </div>
      );
    },
  },
  {
    header: 'Date',
    cell: ({ row }) => {
      return (
        <div className="w-max flex gap-6 ">{row.original.Date}</div>
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
            Delete
          </a>

          {/* edit watch */}

          {/* action dropdown */}
        </div>
      );
    },
  },
];


export { columns, };

