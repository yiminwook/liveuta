'use client';
import { useEffect, useState } from 'react';
import { fetcher } from '@inner/_lib/fetcher';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { isLoadingSheetAtom } from '@/app/_lib/atom';
import { ContentsDataType, MongoDBAPIReturntype } from '@/type/api/mongoDB';

const MONGODB_REFRESH_INTERVAL = 1000 * 60 * 3; // 3 minutes

const useMongoDB = (filter: keyof MongoDBAPIReturntype) => {
  const [isLoad, setIsLoad] = useState(false);
  const [contents, setContents] = useState<ContentsDataType[]>([]);
  const setIsLoadingSheet = useSetAtom(isLoadingSheetAtom);

  const { data, dataUpdatedAt, isLoading, refetch, status } = useQuery<MongoDBAPIReturntype>({
    queryKey: ['mongodb'],
    queryFn: async () => {
      const result: MongoDBAPIReturntype = await fetcher('/api/mongoDBService');
      return result;
    },
    refetchInterval: MONGODB_REFRESH_INTERVAL,
    staleTime: 1000 * 60, // 1 minute
    gcTime: MONGODB_REFRESH_INTERVAL,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdatedAt, filter]);

  useEffect(() => {
    setIsLoadingSheet(() => isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default useMongoDB;
