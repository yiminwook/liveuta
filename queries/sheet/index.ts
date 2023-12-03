'use client';
import { SheetAPIReturntype } from '@/types/inSheet';
import { fetcher } from '@/queries';
import { useQuery } from '@tanstack/react-query';

const useSheet = () => {
  const { data, isLoading, refetch } = useQuery<SheetAPIReturntype>({
    queryKey: ['sheet'],
    queryFn: () => fetcher('/api/sheet'),
    refetchInterval: 1000 * 10 * 30,
  });

  return { sheetData: data, isLoadingSheet: isLoading, refetchSheet: refetch };
};

export default useSheet;
