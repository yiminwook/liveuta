'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@inner/_lib/fetcher';
import { SearchResponseType } from '@/app/api/search/route';

// TODO: 리팩토링 예정

export const useSearchQuery = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('query') ?? '';
  return searchQuery;
};

export const useSearch = () => {
  const searchQuery = useSearchQuery();

  const {
    data = { contents: [], channels: [] },
    isLoading,
    refetch,
  } = useQuery<SearchResponseType>({
    queryKey: [`search_${searchQuery}`],
    queryFn: () => fetcher(`/api/search?query=${searchQuery}`),
    enabled: !!searchQuery,
  });

  return { searchData: data, refetchSearch: refetch, isLoadingSearch: isLoading };
};
