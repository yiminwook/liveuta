import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { UpcomingData } from '../models/sheet/in_sheet';
import useUpcommingData from '@/hooks/useUpcommingData';
import home from '@/styles/Home.module.scss';
import useAllData from '@/hooks/useAllData';
import NavSection from '@/components/home/nav_section';
import YoutubeSection from '@/components/home/youtube_section';

interface HomePageProps {
  total: number;
  upcoming: UpcomingData[];
}

const Home: NextPage<HomePageProps> = () => {
  const [total, setTotal] = useState<number>(0);
  const [showLive, setShowLive] = useState(true);
  const [contents, setContents] = useState<UpcomingData[]>([]);

  const { data: upcomingData, isLoading: upcommingDataLoading } = useUpcommingData();
  const { data: allData, isLoading: allDataLoading } = useAllData();

  const getData = () => {
    if (showLive) {
      if (!upcomingData) return;
      const { total, upcoming } = upcomingData;
      setTotal(() => total);
      setContents(() => upcoming);
    } else {
      if (!allData) return;
      const { total, upcoming } = allData;
      setTotal(() => total);
      setContents(() => upcoming);
    }
  };

  const handleShow = () => {
    setShowLive((pre) => !pre);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upcomingData, allData, showLive]);

  if (allDataLoading || upcommingDataLoading) {
    return null;
  }

  return (
    <main className={home['main']}>
      <NavSection value={showLive ? 'Live' : 'All'} buttonFunc={handleShow} total={total} />
      <YoutubeSection contents={contents} />
    </main>
  );
};

export default Home;
