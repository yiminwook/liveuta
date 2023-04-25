import { sheetAPIReturnType } from '@/models/sheet/Insheet';
import useSWR from 'swr';
import { fetcher } from '@/hooks/Fetcher';

const useScheduledData = () => {
  const { data, error, mutate, isLoading } = useSWR('/api/sheet/upcoming', fetcher<sheetAPIReturnType>(), {
    dedupingInterval: 5 * 1000,
    errorRetryCount: 3,
    errorRetryInterval: 1000,
  });

  return { data, error, mutate, isLoading };
};

export default useScheduledData;
