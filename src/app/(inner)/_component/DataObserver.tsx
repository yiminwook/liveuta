'use client';
import { SelectType } from '@/type';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { getAllSchedule } from '@inner/_action/schedule';
import { schedule } from '@inner/_lib/atom';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { Session } from 'next-auth';
import { useEffect, useLayoutEffect } from 'react';

type DataObserver = {
  session: Session | null;
  children: React.ReactNode;
  filter: keyof ScheduleAPIReturntype;
  select: SelectType;
};

export default function DataObserver({ children, filter, select, session }: DataObserver) {
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
    queryFn: () =>
      getAllSchedule({ accessToken: session?.user.accessToken }).then((res) => {
        if (!res.result) throw new Error(res.message);
        return res.result;
      }),
    ...option,
  });

  useEffect(() => {
    if (data) setSchedule(() => data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <>{children}</>;
}
