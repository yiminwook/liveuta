import { SheetAPIReturnType } from '@/models/sheet/InSheet';
import useSWR from 'swr';
import { fetcher } from '@/hooks/Fetcher';

const useAllData = () => {
  const { data, error, mutate, isLoading } = useSWR('/api/sheet/all', fetcher<SheetAPIReturnType>(), {
    dedupingInterval: 3 * 60 * 1000,
    errorRetryCount: 3,
    errorRetryInterval: 3 * 1000,
  });

  return { data, error, mutate, isLoading };
};

export default useAllData;
