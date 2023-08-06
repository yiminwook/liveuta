import useSWR from 'swr';
import { fetcher } from '@/hooks/api/fetcher';
import { SearchResponseType } from '@/app/api/search/route';
import { useSearchParams } from 'next/navigation';

export const useSearchQuery = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('query') ?? '';
  return searchQuery;
};

export const useSearch = () => {
  const searchQuery = useSearchQuery();

  const options = {
    dedupingInterval: 10 * 1000,
  };

  const {
    data = { contents: [], channels: [] },
    error,
    mutate,
    isLoading,
  } = useSWR<SearchResponseType>(searchQuery ? `/api/search?query=${searchQuery}` : null, fetcher, options);

  return { data, error, mutate, isLoading };
};
