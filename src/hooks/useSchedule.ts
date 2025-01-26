import { SCHEDULE_CACHE_TIME } from '@/constants';
import { GetScheduleRes } from '@/types/api/schedule';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { cons } from 'effect/List';
import { useAutoSync } from './useStorage';

export const useSchedule = (option?: {
  enableAutoSync: boolean; //유저설정과 관계없이 페이지별로 설정옵션
}) => {
  const { isActive, refreshInterval } = useAutoSync(); //유저설정

  const userCacheTime = isActive ? refreshInterval * 60 * 1000 : false;

  // a tag, window.location.href, window.location.reload() 등을 사용하여 페이지 이동시 캐시가 무효화됨
  const query = useQuery({
    queryKey: ['schedule'],
    queryFn: () => axios.get<GetScheduleRes>('/api/v1/schedule').then((res) => res.data.data),
    staleTime: SCHEDULE_CACHE_TIME, // 페이지 이동시 SCHEDULE_CACHE_TIME 동안은 캐시를 사용, data-fetching이 발생하지 않음
    gcTime: SCHEDULE_CACHE_TIME, // stale time이 지나지 않으면 data-fetch 중에 stale된 data를 대신 보여줌, isPending과 관계가 있음
    refetchInterval: option?.enableAutoSync ? userCacheTime : false, // 페이지내 동기화 주기, 같은 페이지내에서 주기적으로 호출
    refetchOnReconnect: isActive,
    refetchOnWindowFocus: isActive,
    refetchIntervalInBackground: false,
  });

  console.log('refetchInterval', option?.enableAutoSync ? userCacheTime : false);
  console.log('isActive', isActive);
  console.log('userCacheTime', refreshInterval);

  return query;
};
