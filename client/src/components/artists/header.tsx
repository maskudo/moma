'use client';

import { cn } from '../../lib/utils';
import * as React from 'react';
import { Input } from '../ui/input';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Header: React.FC = () => {
  let [searchParams, _setSearchParams] = useSearchParams()
  const artistName = searchParams.get('artist');
  const navigate = useNavigate()
  const pathname = useLocation()
  console.log({ pathname })
  return (
    <div className={cn(['flex items-center justify-between text-b1'])}>
      <Input
        onChange={(e) => {
          searchParams.set('artist', e.target.value)
          console.log(e.target.value)
          const params = new URLSearchParams();
          params.set('artist', artistName ?? '');
          navigate(pathname.pathname + '?' + params.toString())
        }}
        placeholder="Search Artists"
        className="min-w-[5rem] mr-1"
      />
    </div>
  );
};

export default Header;

