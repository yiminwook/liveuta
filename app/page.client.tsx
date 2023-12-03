'use client';
import { useEffect, useMemo, useState } from 'react';
import { ContentsDataType, SheetAPIReturntype } from '@/types/inSheet';
import useSheet from '@/queries/sheet';
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

  const { sheetData, isLoadingSheet } = useSheet();
  const [contents, setContents] = useState<ContentsDataType[]>([]);

  const setData = () => {
    if (!sheetData) return;
    setContents(() => sheetData[filter].contents.slice());
  };

  useEffect(() => {
    setData();
  }, [filter, sheetData]);

  return (
    <>
      {isLoadingSheet ? <Loading /> : null}
      <NavSection select={select} />
      <ScheduleSection contents={contents} />
    </>
  );
};

export default Main;
