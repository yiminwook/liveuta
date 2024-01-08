'use client';
import { useEffect, useState } from 'react';
import { ContentsDataType, SheetAPIReturntype } from '@/types/inSheet';
import { fetcher } from '@/queries';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { isLoadingSheetAtom } from '@/atoms';

const SHEET_REFRESH_INTERVAL = 1000 * 60 * 3; //3분

interface UseSheetProps {
  filter: keyof SheetAPIReturntype;
}
const useSheet = ({ filter }: UseSheetProps) => {
  const [contents, setContents] = useState<ContentsDataType[]>([]);
  const setIsLoadingSheet = useSetAtom(isLoadingSheetAtom);

  const { data, dataUpdatedAt, isLoading, refetch } = useQuery<SheetAPIReturntype>({
    queryKey: ['sheet'],
    queryFn: async () => {
      // throw new Error('fetcher not defined');
      return await fetcher('/api/sheet');
    },
    refetchInterval: SHEET_REFRESH_INTERVAL,
    staleTime: 1000 * 60, //1분
    gcTime: SHEET_REFRESH_INTERVAL,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  });

  const setData = () => {
    if (!data) return;
    setContents(() => data[filter].contents.slice());
  };

  useEffect(() => {
    setData();
  }, [dataUpdatedAt, filter]);

  useEffect(() => {
    setIsLoadingSheet(() => isLoading);
  }, [isLoading]);

  return {
    /** 필터링된 데이터 */
    contents,
    /** 원본 데이터 */
    sheetData: data,
    filter,
    isLoadingSheet: isLoading,
    refetchSheet: refetch,
    sheetDataUpdatedAt: dataUpdatedAt,
  };
};

export default useSheet;
