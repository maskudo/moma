'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Artists } from '@/types/Artists';
import { cn } from '../../lib/utils';
import { Trash } from 'lucide-react';
import { deleteArtist } from '@/mutation/delete-artist';
import toast from 'react-hot-toast';


const columns: ColumnDef<Artists>[] = [
  {
    header: 'ID',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4 ">
        <div>
          <span className="block text-b1 mb-1 line-clamp-1 ">{row.original.ConstituentID}</span>
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
    cell: ({ row }) => {
      const handleClick = async () => {
        try {
          await deleteArtist(row.original.ConstituentID)
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
            onClick={handleClick}
            className={cn([
              'hover:bg-black-10 p-1 rounded',
              'opacity-0 group-hover:opacity-100',
            ])}
          >
            <Trash />
          </button>

        </div>
      );
    },
  },
];


export { columns, };

