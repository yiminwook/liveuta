'use client';
import useSheet from '@/queries/sheet';
import NavSection from '@/components/home/NavSection';
import ScheduleSection from '@/components/home/ScheduleSection';
import TopSection from '@/components/home/TopSection';
import Pip from '@/components/common/player/Pip';

interface MainProps {}

const Main = ({}: MainProps) => {
  const { contents, isLoad } = useSheet();

  return (
    <>
      <NavSection />
      <TopSection isLoad={isLoad} contents={contents} />
      <ScheduleSection contents={contents} />
      <Pip />
    </>
  );
};

export default Main;
