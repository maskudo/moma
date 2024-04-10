'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '../../lib/utils';
import { Artwork } from '@/types/Artworks';
import { Trash } from 'lucide-react';
import { deleteArtwork, } from '@/mutation/create-artwork';
import toast from 'react-hot-toast';


const columns: ColumnDef<Artwork>[] = [
  {
    header: 'ID',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4 ">
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
        <div className="w-max flex gap-6 ">{row.original.DisplayName}</div>
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
          <a target='_blank' rel='noreferrer' href={row.original.URL}>URL</a>
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
    cell: ({ row }) => {
      //cannot use hook here in react but you could in next js with a disable eslint rule
      const handleClick = async () => {
        try {
          await deleteArtwork(row.original.id)
          toast.success("Artwork deleted successfully.")
        } catch (e) {
          toast.error("Error deleting artwork")
        }
      }

      return (
        <div
          className="w-max flex items-center gap-x-3"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            className={cn([
              'hover:bg-black-10 p-1 rounded',
              'opacity-0 group-hover:opacity-100',
            ])}
            onClick={handleClick}
          >
            <Trash />
          </button>
        </div>
      );
    },
  },
];


export { columns, };

