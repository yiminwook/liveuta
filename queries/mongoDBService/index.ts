'use client';
import { useEffect, useState } from 'react';
import { fetcher } from '@/queries';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { isLoadingSheetAtom } from '@/atoms';

const MONGODB_REFRESH_INTERVAL = 1000 * 60 * 3; // 3 minutes

// NOTE: Temporary data types set to 'any'. Modify types after transitioning to MongoDB service.
const useMongoDB = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [contents, setContents] = useState<any[]>([]);
  const setIsLoadingSheet = useSetAtom(isLoadingSheetAtom);

  const { data, dataUpdatedAt, isLoading, refetch, status } = useQuery<any>({
    queryKey: ['mongodb'],
    queryFn: async () => {
      return await fetcher('/api/mongoDBService');
    },
    refetchInterval: MONGODB_REFRESH_INTERVAL,
    staleTime: 1000 * 60, // 1 minute
    gcTime: MONGODB_REFRESH_INTERVAL,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  });

  useEffect(() => {
    if (data && status === 'success') {
      setContents(data.contents);
      setIsLoad(true);
    }
  }, [dataUpdatedAt]);

  useEffect(() => {
    setIsLoadingSheet(isLoading);
  }, [isLoading]);

  return {
    contents,
    data,
    isLoadingSheet: isLoading,
    refetchSheet: refetch,
    sheetDataUpdatedAt: dataUpdatedAt,
    isLoad,
  };
};


export default useMongoDB;
