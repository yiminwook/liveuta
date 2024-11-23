'use client';
import { VideoType } from '@/types';
import { ScheduleAPIReturnType } from '@/types/api/mongoDB';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import MainLoading from './loading/MainLoading';
import axios from 'axios';
import * as schedule from '@/stores/schedule';
import { GetScheduleRes } from '@/types/api/schedule';

const SCHEDULE_REFRESH_INTERVAL = 1000 * 60 * 3; // 3 minutes

type HomeDataObserverProps = {
  filter: keyof ScheduleAPIReturnType;
  select: VideoType;
  query: string;
};

export default function HomeDataObserver({ filter, select, query }: HomeDataObserverProps) {
  const setSchedule = useSetAtom(schedule.scheduleAtom);
  const setSelect = useSetAtom(schedule.selectAtom);
  const setFilter = useSetAtom(schedule.filterAtom);
  const setQuery = useSetAtom(schedule.queryAtom);

  // schedule observer
  const { data, isLoading } = useQuery({
    queryKey: ['schedule'],
    queryFn: () => axios.get<GetScheduleRes>('/api/v1/schedule').then((res) => res.data.data),
    staleTime: SCHEDULE_REFRESH_INTERVAL,
    gcTime: SCHEDULE_REFRESH_INTERVAL,
    refetchInterval: SCHEDULE_REFRESH_INTERVAL as number | false | undefined,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  });

  useEffect(() => {
    setSelect(() => select);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  useEffect(() => {
    setFilter(() => filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    setQuery(() => query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (data) setSchedule(() => data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) return <MainLoading backdrop={true} />;
  else return null;
}
