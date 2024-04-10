'use client';

import { cn } from '../../lib/utils';
import * as React from 'react';
import { Input } from '../ui/input';
import useMySearchParams from '@/hooks/use-search-params';

const Header: React.FC = () => {
  const { setParam } = useMySearchParams()
  return (
    <div className={cn(['flex items-center justify-between text-b1'])}>
      <Input
        onChange={(e) => {
          setParam('artist', e.target.value)
        }}
        placeholder="Search Artists"
        className="min-w-[5rem] mr-1"
      />
    </div>
  );
};

export default Header;

