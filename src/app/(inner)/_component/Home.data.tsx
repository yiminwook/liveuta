'use client';
import { VideoType } from '@/type';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useLayoutEffect } from 'react';
import MainLoading from './loading/MainLoading';
import axios from 'axios';
import * as schedule from '@inner/_lib/atom/schedule';
import { GetScheduleRes } from '@api/schedule/type';

const SCHEDULE_REFRESH_INTERVAL = 1000 * 60 * 3; // 3 minutes

type HomeDataObserverProps = {
  filter: keyof ScheduleAPIReturntype;
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
    queryFn: () => axios.get<GetScheduleRes>('/api/schedule').then((res) => res.data.data),
    staleTime: SCHEDULE_REFRESH_INTERVAL,
    gcTime: SCHEDULE_REFRESH_INTERVAL,
    refetchInterval: SCHEDULE_REFRESH_INTERVAL as number | false | undefined,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  });

  useLayoutEffect(() => {
    setSelect(() => select);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  useLayoutEffect(() => {
    setFilter(() => filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useLayoutEffect(() => {
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
