'use client';
import { SelectType } from '@/type';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { schedule } from '@inner/_lib/atom';
import getSchedule from '@inner/_lib/getSchedule';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect, useLayoutEffect } from 'react';

type DataObserver = {
  children: React.ReactNode;
  filter: keyof ScheduleAPIReturntype;
  select: SelectType;
};

export default function DataObserver({ children, filter, select }: DataObserver) {
  const [key] = useAtom(schedule.scheduleKeyAtom);
  const [option] = useAtom(schedule.scheduleOptionAtom);
  const [, setSchedule] = useAtom(schedule.scheduleAtom);
  const [, setSelect] = useAtom(schedule.selectAtom);
  const [, setFilter] = useAtom(schedule.filterAtom);

  useLayoutEffect(() => {
    setSelect(() => select);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  useLayoutEffect(() => {
    setFilter(() => filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // schedule observer
  const { data, dataUpdatedAt, status } = useQuery({
    queryKey: key,
    queryFn: () => getSchedule(),
    ...option,
  });

  useEffect(() => {
    if (status === 'success') {
      setSchedule(() => data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdatedAt]);

  return <>{children}</>;
}
