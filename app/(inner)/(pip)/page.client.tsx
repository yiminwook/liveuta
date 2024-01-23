'use client';
import useSheet from '@/queries/sheet';
import NavSection from '@/components/home/NavSection';
import ScheduleSection from '@/components/home/ScheduleSection';
import TopSection from '@/components/home/TopSection';
import useResponsive from '@/hooks/useResponsive';
import clientOnly from '@/models/clientOnly';
import { SheetAPIReturntype } from '@/types/inSheet';

interface MainProps {
  filter: keyof SheetAPIReturntype;
}

const Main = ({ filter }: MainProps) => {
  const { contents, isLoad } = useSheet(filter);
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