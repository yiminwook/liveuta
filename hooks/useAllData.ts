import { ContentsDataType } from '@/models/sheet/Insheet';
import useSWR from 'swr';
import { fetcher } from '@/hooks/fetcher';

const useAllData = () => {
  const { data, error, mutate, isLoading } = useSWR(
    '/api/sheet/all',
    fetcher<{ total: number; upcoming: ContentsDataType[] }>(),
    { dedupingInterval: 3 * 60 * 1000, errorRetryCount: 3, errorRetryInterval: 1000 },
  );

  return { data, error, mutate, isLoading };
};

export default useAllData;
