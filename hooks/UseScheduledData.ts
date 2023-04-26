import { SheetAPIReturnType } from '@/models/sheet/InSheet';
import useSWR from 'swr';
import { fetcher } from '@/hooks/Fetcher';

const useScheduledData = () => {
  const { data, error, mutate, isLoading } = useSWR('/api/sheet/upcoming', fetcher<SheetAPIReturnType>(), {
    dedupingInterval: 15 * 1000,
    errorRetryCount: 3,
    errorRetryInterval: 3 * 1000,
  });

  return { data, error, mutate, isLoading };
};

export default useScheduledData;
