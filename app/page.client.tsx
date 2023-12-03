'use client';

import useSheet from '@/queries/sheet';
import NavSection from '@/components/home/NavSection';
import ScheduleSection from '@/components/home/ScheduleSection';
import Loading from '@/components/common/Loading';

interface MainProps {}

const Main = ({}: MainProps) => {
  const { contents, isLoadingSheet } = useSheet();

  return (
    <>
      {isLoadingSheet ? <Loading /> : null}
      <NavSection />
      <ScheduleSection contents={contents} />
    </>
  );
};

export default Main;
