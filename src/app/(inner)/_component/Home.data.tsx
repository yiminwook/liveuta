'use client';
import { VideoType } from '@/type';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { getAllSchedule } from '@inner/_action/schedule';
import { schedule } from '@inner/_lib/atom';
import serverActionHandler from '@inner/_lib/serverActionHandler';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useLayoutEffect } from 'react';

type HomeDataObserverProps = {
  filter: keyof ScheduleAPIReturntype;
  select: VideoType;
};

export default function HomeDataObserver({ filter, select }: HomeDataObserverProps) {
  const [option] = useAtom(schedule.scheduleOptionAtom);
  const setSchedule = useSetAtom(schedule.scheduleAtom);
  const setSelect = useSetAtom(schedule.selectAtom);
  const setFilter = useSetAtom(schedule.filterAtom);

  // schedule observer
  const { data } = useQuery({
    queryKey: ['schedule'],
    queryFn: () => serverActionHandler(getAllSchedule()),
    ...option,
  });

  useLayoutEffect(() => {
    setSelect(() => select);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  useLayoutEffect(() => {
    setFilter(() => filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (data) setSchedule(() => data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return null;
}
