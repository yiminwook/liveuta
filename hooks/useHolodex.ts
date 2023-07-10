import useSWRInfinite from 'swr/infinite';
import { fetcher } from '@/hooks/fetcher';
import { SetListResponseType } from '@/app/api/setlist/route';
import { useMemo } from 'react';

export const useHolodexSearchComment = (query: string) => {
  const getKey = (pageIndex: number, previousPageData: SetListResponseType) => {
    try {
      if (previousPageData && (previousPageData.totalPage === 0 || previousPageData.items.length === 0)) {
        return null; // 끝에 도달
      }
      return `/api/setlist?page=${pageIndex}&query=${query}`; // SWR 키
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const {
    data = [],
    mutate: setListMutate,
    size: setListSize,
    setSize: setListSetSize,
    isLoading: setListIsLoading,
  } = useSWRInfinite<SetListResponseType>(getKey, fetcher);

  const setListItems = useMemo(() => {
    console.log('size', setListSize);
    return data
      .slice()
      .reduce<SetListResponseType['items'][]>((acc, { items }) => {
        acc.push(items);
        return acc;
      }, [])
      .flat();
  }, [data]);

  const totalSize = useMemo(() => {
    return data[0]?.totalPage || 0;
  }, [data]);

  const isOverPagination = useMemo(() => {
    return setListSize > totalSize;
  }, [totalSize, setListSize]);

  const handlePagination = () => {
    if (isOverPagination) return;
    setListSetSize((pre) => pre + 1);
  };

  return {
    setListItems,
    setListMutate,
    setListSize,
    setListSetSize,
    setListIsLoading,
    handlePagination,
    isOverPagination,
    totalSize,
  };
};
