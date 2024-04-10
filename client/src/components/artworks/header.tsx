'use client';

import * as React from 'react';
import useMySearchParams from '@/hooks/use-search-params';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const Header: React.FC = () => {
  const { setParam } = useMySearchParams()
  return (
    <div className={cn(['flex items-center justify-between text-b1'])}>
      <Input
        onChange={(e) => {
          setParam('artwork', e.target.value)
        }}
        placeholder="Search Artworks"
        className="min-w-[5rem] mr-1"
      />
    </div>
  );
};

export default Header;

