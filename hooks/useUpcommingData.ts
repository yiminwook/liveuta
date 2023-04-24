import { UpcomingData } from '@/models/sheet/in_sheet';
import useSWR from 'swr';
import { fetcher } from '@/hooks/fetcher';

const useUpcommingData = () => {
  const { data, error, mutate, isLoading } = useSWR(
    '/api/sheet/upcoming',
    fetcher<{ total: number; upcoming: UpcomingData[] }>(),
    { dedupingInterval: 5 * 1000, errorRetryCount: 3, errorRetryInterval: 1000 },
  );

  return { data, error, mutate, isLoading };
};

export default useUpcommingData;
