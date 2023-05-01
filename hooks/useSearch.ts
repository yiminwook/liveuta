import useSWR from 'swr';
import { fetcher } from '@/hooks/fetcher';
import { SearchResponseType } from '@/pages/api/search';

const useSearch = (nameQuery: string) => {
  const options = {
    errorRetryCount: 3,
    errorRetryInterval: 3 * 1000,
    dedupingInterval: 10 * 1000,
  };
  const { data, error, mutate, isLoading } = useSWR<SearchResponseType>(
    nameQuery ? `/api/search?query=${nameQuery}` : null,
    fetcher,
    options,
  );
  return { data, error, mutate, isLoading };
};

export default useSearch;
