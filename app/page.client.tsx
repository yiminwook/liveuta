'use client';
import useSheet from '@/queries/sheet';
import NavSection from '@/components/home/NavSection';
import ScheduleSection from '@/components/home/ScheduleSection';
import TopSection from '@/components/home/TopSection';

interface MainProps {}

const Main = ({}: MainProps) => {
  const { contents } = useSheet();

  return (
    <>
      <NavSection />
      <TopSection />
      <ScheduleSection contents={contents} />
    </>
  );
};

export default Main;
