'use client';
import { SelectType } from '@/type';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import {
  useFilterAtom,
  useScheduleAtom,
  useScheduleKeyAtom,
  useScheduleOptionAtom,
  useSelectAtom,
} from '@inner/_lib/atom';
import getSchedule from '@inner/_lib/getSchedule';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useLayoutEffect } from 'react';

type ScheduleDataProviderProps = {
  children: React.ReactNode;
  filter: keyof ScheduleAPIReturntype;
  select: SelectType;
};

export default function ScheduleDataProvider({
  children,
  filter,
  select,
}: ScheduleDataProviderProps) {
  const [key] = useScheduleKeyAtom();
  const [option] = useScheduleOptionAtom();
  const [, setSchedule] = useScheduleAtom();
  const [, setSelect] = useSelectAtom();
  const [, setFilter] = useFilterAtom();

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
