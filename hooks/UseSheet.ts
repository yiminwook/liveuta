import { SheetAPIReturntype } from '@/models/sheet/InSheet';
import useSWR from 'swr';
import { fetcher } from '@/hooks/Fetcher';

const useSheet = () => {
  const { data, error, mutate, isLoading } = useSWR<SheetAPIReturntype>('/api/sheet', fetcher, {
    dedupingInterval: 30 * 1000,
    errorRetryCount: 3,
    errorRetryInterval: 5 * 1000,
  });
  return { data, error, mutate, isLoading };
};

export default useSheet;
