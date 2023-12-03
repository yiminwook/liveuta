'use client';
import { useEffect, useState } from 'react';
import { ContentsDataType, SheetAPIReturntype } from '@/types/inSheet';
import { fetcher } from '@/queries';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

const SHEET_REFRESH_INTERVAL = 1000 * 60; //1분

const useSheet = () => {
  const filter = (usePathname()?.split('/')[1] || 'scheduled') as keyof SheetAPIReturntype;
  const [contents, setContents] = useState<ContentsDataType[]>([]);

  const { data, dataUpdatedAt, isLoading, refetch } = useQuery<SheetAPIReturntype>({
    queryKey: ['sheet'],
    queryFn: () => fetcher('/api/sheet'),
    refetchInterval: SHEET_REFRESH_INTERVAL,
    staleTime: SHEET_REFRESH_INTERVAL,
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
