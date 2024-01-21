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
  const { isMobile, isTablet } = useResponsive();

  return (
    <>
      <NavSection filter={filter} />
      <TopSection isLoad={isLoad} contents={contents} isMobile={isMobile} isTablet={isTablet} />
      <ScheduleSection contents={contents} isMobile={isMobile} />
    </>
  );
};

export default clientOnly(Main);
