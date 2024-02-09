'use client';
import { useEffect } from 'react';
//import useSheet from '@/queries/sheet';
import NavSection from '@inner/_copmonent/NavSection';
import ScheduleSection from '@inner/_copmonent/ScheduleSection';
import TopSection from '@inner/_copmonent/TopSection';
import useResponsive from '@/hook/useResponsive';
import clientOnly from '@/model/clientOnly';
//import { SheetAPIReturntype } from '@/types/inSheet';
import useMongoDB from '@/queries/mongoDBService';
import { MongoDBAPIReturntype } from '@/type/inMongoDB';

interface MainProps {
  filter: keyof MongoDBAPIReturntype;
}

const Main = ({ filter }: MainProps) => {
  const { contents, isLoad } = useMongoDB(filter);
  const { isMobile, isDesktop } = useResponsive();

  return (
    <>
      <NavSection filter={filter} />
      <TopSection
        isLoad={isLoad}
        filter={filter}
        contents={contents}
        isMobile={isMobile}
        isDesktop={isDesktop}
      />
      <ScheduleSection contents={contents} isMobile={isMobile} />
    </>
  );
};

export default clientOnly(Main);
