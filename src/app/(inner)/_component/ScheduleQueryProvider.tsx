'use client';
import { SelectType } from '@/type';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { useFilterAtom, useScheduleAtom, useSelectAtom } from '@inner/_lib/atom';
import getSchedule from '@inner/_lib/getSchedule';
import { useQuery } from '@tanstack/react-query';
import { useLayoutEffect } from 'react';

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
  const [data] = useScheduleAtom();
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

  if (!data.data) return null;
  return <>{children}</>;
}
