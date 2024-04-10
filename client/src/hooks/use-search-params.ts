
import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const useMySearchParams = () => {
  const router = useNavigate();
  const pathname = useLocation().pathname;
  const [searchParams, _setSearchParams] = useSearchParams()!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const deleteQueryString = React.useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name);

      return params.toString();
    },
    [searchParams],
  );

  // setParams
  const setParam = (name: string, value: string) => {
    router((pathname + '?' + createQueryString(name, value)));
  };

  // delete Params
  const deleteParam = (name: string) => {
    router(pathname + '?' + deleteQueryString(name));
  };

  const clearParams = (names: string[]) => {
    const params = new URLSearchParams(searchParams);

    // Remove each specified parameter from the URLSearchParams object
    names.forEach((name) => {
      params.delete(name);
    });

    // Construct the new query string
    const queryString = params.toString();

    // Update the router with the new pathname and query string
    router(queryString ? `${pathname}?${queryString}` : pathname);
  };

  // get search params from array of params;
  const getSearchParamsArray = (params: Array<string>) => {
    return params.map((_param) => searchParams.get(_param));
  };

  return { setParam, deleteParam, searchParams, getSearchParamsArray, clearParams };
};

export default useMySearchParams;
