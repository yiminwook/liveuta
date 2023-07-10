import useSWRInfinite from 'swr/infinite';
import { fetcher } from '@/hooks/fetcher';
import { SetListResponseType } from '@/app/api/setlist/route';

export const useHolodexSearchComment = (query: string) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // 끝에 도달
    return `/api/setlist?page=${pageIndex}&query=${query}`; // SWR 키
  };

  const {
    data: setListData = [],
    mutate: setListMutate,
    size: setListSize,
    setSize: setListSetSize,
    isLoading: setListIsLoading,
  } = useSWRInfinite<SetListResponseType>(getKey, fetcher);

  return { setListData, setListMutate, setListSize, setListSetSize, setListIsLoading };
};
