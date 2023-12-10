'use client';

import useSheet from '@/queries/sheet';
import NavSection from '@/components/home/NavSection';
import ScheduleSection from '@/components/home/ScheduleSection';
import { SheetAPIReturntype } from '@/types/inSheet';

interface MainProps {
  filter: keyof SheetAPIReturntype;
}

const Main = ({ filter }: MainProps) => {
  const { contents } = useSheet({ filter });

  return (
    <>
      <NavSection />
      <ScheduleSection contents={contents} />
    </>
  );
};

export default Main;
