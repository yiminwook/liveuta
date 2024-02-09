'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@inner/_lib/fetcher';
import { SearchResponseType } from '@/app/api/search/route';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { isLoadingSearchAtom } from '@/app/_lib/atom';

export const useSearchQuery = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('query') ?? '';
  return searchQuery;
};

export const useSearch = () => {
  const searchQuery = useSearchQuery();
  const setIsLoadingSearchAtom = useSetAtom(isLoadingSearchAtom);

  const {
    data = { contents: [], channels: [] },
    isLoading,
    refetch,
  } = useQuery<SearchResponseType>({
    queryKey: [`search_${searchQuery}`],
    queryFn: () => fetcher(`/api/search?query=${searchQuery}`),
    enabled: !!searchQuery,
  });

  useEffect(() => {
    setIsLoadingSearchAtom(() => isLoading);
  }, [isLoading]);

  return { searchData: data, refetchSearch: refetch, isLoadingSearch: isLoading };
};
