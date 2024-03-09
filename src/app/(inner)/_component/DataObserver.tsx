'use client';
import { SelectType } from '@/type';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { schedule } from '@inner/_lib/atom';
import getSchedule from '@inner/_lib/getSchedule';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useLayoutEffect } from 'react';

type DataObserver = {
  children: React.ReactNode;
  filter: keyof ScheduleAPIReturntype;
  select: SelectType;
};

export default function DataObserver({ children, filter, select }: DataObserver) {
  const [key] = useAtom(schedule.scheduleKeyAtom);
  const [option] = useAtom(schedule.scheduleOptionAtom);
  const setSchedule = useSetAtom(schedule.scheduleAtom);
  const setSelect = useSetAtom(schedule.selectAtom);
  const setFilter = useSetAtom(schedule.filterAtom);

  useLayoutEffect(() => {
    setSelect(() => select);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  useLayoutEffect(() => {
    setFilter(() => filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // schedule observer
  const { data } = useQuery({
    queryKey: key,
    queryFn: () => getSchedule(),
    ...option,
  });

  useEffect(() => {
    if (data) setSchedule(() => data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <>{children}</>;
}
