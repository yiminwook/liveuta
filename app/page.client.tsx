'use client';
import useSheet from '@/queries/sheet';
import NavSection from '@/components/home/NavSection';
import ScheduleSection from '@/components/home/ScheduleSection';
import TopSection from '@/components/home/TopSection';
import Pip from '@/components/common/player/Pip';
import useResponsive from '@/hooks/useResponsive';
import clientOnly from '@/models/clientOnly';

interface MainProps {}

const Main = ({}: MainProps) => {
  const { contents, isLoad } = useSheet();
  const { isMobile, isTablet } = useResponsive();

  return (
    <>
      <NavSection />
      <TopSection isLoad={isLoad} contents={contents} isMobile={isMobile} isTablet={isTablet} />
      <ScheduleSection contents={contents} isMobile={isMobile} />
      <Pip />
    </>
  );
};

export default clientOnly(Main);
