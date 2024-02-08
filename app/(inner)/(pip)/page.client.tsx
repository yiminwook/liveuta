'use client';
import { useEffect } from 'react';
//import useSheet from '@/queries/sheet';
import NavSection from '@/components/home/NavSection';
import ScheduleSection from '@/components/home/ScheduleSection';
import TopSection from '@/components/home/TopSection';
import useResponsive from '@/hooks/useResponsive';
import clientOnly from '@/models/clientOnly';
//import { SheetAPIReturntype } from '@/types/inSheet';
import useMongoDB from '@/queries/mongoDBService';
import { MongoDBAPIReturntype } from '@/types/inMongoDB';

interface MainProps {
  filter: keyof MongoDBAPIReturntype;
}

const Main = ({ filter }: MainProps) => {
  const { contents, isLoad } = useMongoDB(filter);
  const { isMobile, isDesktop } = useResponsive();

  return (
  <>
    <NavSection filter={filter} />
    <TopSection isLoad={isLoad} filter={filter} contents={contents} isMobile={isMobile} isDesktop={isDesktop} />
    <ScheduleSection contents={contents} isMobile={isMobile} />
  </>
  );

};

export default clientOnly(Main);
