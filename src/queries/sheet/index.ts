'use client';
import { useEffect, useState } from 'react';
import { ContentsDataType, SheetAPIReturntype } from '@/type/inSheet';
import { fetcher } from '@/queries';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { isLoadingSheetAtom } from '@/atom';

const SHEET_REFRESH_INTERVAL = 1000 * 60 * 3; //3분

const useSheet = (filter: keyof SheetAPIReturntype) => {
  const [isLoad, setIsLoad] = useState(false);
  const [contents, setContents] = useState<ContentsDataType[]>([]);
  const setIsLoadingSheet = useSetAtom(isLoadingSheetAtom);

  const { data, dataUpdatedAt, isLoading, refetch, status } = useQuery<SheetAPIReturntype>({
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
    const contents = [...data[filter].contents];
    setContents(() => contents);
  };

  useEffect(() => {
    if (data && status === 'success') {
      //onSuccess
      setData();
      setIsLoad(() => true);
    }
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
    isLoad,
  };
};

export default useSheet;
