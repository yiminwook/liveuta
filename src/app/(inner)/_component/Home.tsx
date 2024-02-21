'use client';
import NavSection from './header/NavSection';
import ScheduleSection from './ScheduleSection';
import TopSection from './TopSection';
import useResponsive from '@/hook/useResponsive';
import useMongoDB from '@inner/_lib/getSchedule';
import { MongoDBAPIReturntype } from '@/type/api/mongoDB';

interface HomeProps {
  filter: keyof MongoDBAPIReturntype;
}

export default function Home({ filter }: HomeProps) {
  const { contents, isLoad } = useMongoDB(filter);
  const { isMobile, isDesktop } = useResponsive();

  return (
    <main id="app">
      <NavSection filter={filter} />
      <TopSection
        isLoad={isLoad}
        filter={filter}
        contents={contents}
        isMobile={isMobile}
        isDesktop={isDesktop}
      />
      <ScheduleSection contents={contents} isMobile={isMobile} />
    </main>
  );
}
