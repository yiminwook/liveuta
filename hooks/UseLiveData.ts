import useSWR from 'swr';
import { liveFetcher } from '@/hooks/Fetcher';

const useLiveData = () => {
  const { data, error, mutate, isLoading } = useSWR('/api/sheet/upcoming#live', liveFetcher, {
    dedupingInterval: 5 * 1000,
    errorRetryCount: 3,
    errorRetryInterval: 1000,
  });

  return { data, error, mutate, isLoading };
};

export default useLiveData;
