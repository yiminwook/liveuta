import useSWR from 'swr';
import { dailyFetcher } from '@/hooks/Fetcher';

const useDailyData = () => {
  const { data, error, mutate, isLoading } = useSWR('/api/sheet/all#daily', dailyFetcher, {
    dedupingInterval: 3 * 60 * 1000,
    errorRetryCount: 3,
    errorRetryInterval: 3 * 1000,
  });

  return { data, error, mutate, isLoading };
};

export default useDailyData;
