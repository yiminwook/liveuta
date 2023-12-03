'use client';
import { useEffect, useMemo, useState } from 'react';
import { ContentsDataType, SheetAPIReturntype } from '@/types/inSheet';
import useSheet from '@/hooks/api/useSheet';
import NavSection from '@/components/home/NavSection';
import ScheduleSection from '@/components/home/ScheduleSection';
import Loading from '@/components/common/Loading';
import { usePathname } from 'next/navigation';

interface MainProps {
  select: string;
}

const Main = ({ select }: MainProps) => {
  const pathName = usePathname()?.replace('/', '') || '';
  const filter = useMemo(() => (pathName === '' ? 'scheduled' : pathName) as keyof SheetAPIReturntype, [pathName]);

  const { data, isLoading } = useSheet();
  const [contents, setContents] = useState<ContentsDataType[]>([]);

  const setData = () => {
    if (!data) return;
    setContents(() => data[filter].contents.slice());
  };

  useEffect(() => {
    setData();
  }, [filter, data]);

  return (
    <>
      {isLoading ? <Loading /> : null}
      <NavSection select={select} />
      <ScheduleSection contents={contents} />
    </>
  );
};

export default Main;
