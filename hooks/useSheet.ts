import { SheetAPIReturntype } from '@/types/inSheet';
import useSWR from 'swr';
import { fetcher } from '@/hooks/fetcher';

const useSheet = () => {
  const { data, error, mutate, isLoading } = useSWR<SheetAPIReturntype>('/api/sheet', fetcher);
  return { data, error, mutate, isLoading };
};

export default useSheet;
