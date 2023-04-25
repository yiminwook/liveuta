import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { ContentsDataType } from '@/models/sheet/Insheet';
import useUpcommingData from '@/hooks/useUpcommingData';
import home from '@/styles/home/Home.module.scss';
import useAllData from '@/hooks/UseAllData';
import NavSection from '@/components/home/NavSection';
import YoutubeSection from '@/components/home/YoutubeSection';
import Loading from '@/components/Loading';

interface HomePageProps {
  total: number;
  upcoming: ContentsDataType[];
}

const HomePage: NextPage<HomePageProps> = () => {
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState<0 | 1 | 2>(0);
  const [contents, setContents] = useState<ContentsDataType[]>([]);

  const { data: upcomingData, isLoading: upcommingDataLoading } = useUpcommingData();
  const { data: allData, isLoading: allDataLoading } = useAllData();

  const getData = () => {
    if (filter === 0) {
      if (!upcomingData) return;
      const { total, upcoming } = upcomingData;
      setTotal(() => total);
      setContents(() => upcoming);
    } else if (filter === 1) {
      if (!upcomingData) return;
      const { upcoming } = upcomingData;
      const liveData = upcoming.filter((data) => data.isLive === true);
      setTotal(() => liveData.length);
      setContents(() => liveData);
    } else {
      if (!allData) return;
      const { total, upcoming } = allData;
      setTotal(() => total);
      setContents(() => upcoming);
    }
  };

  const handleShow = () => {
    setFilter((pre) => {
      if (pre === 2) return 0;
      else return (pre + 1) as 1 | 2;
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upcomingData, allData, filter]);

  if (allDataLoading || upcommingDataLoading) {
    return <Loading />;
  }

  return (
    <main className={home['main']}>
      <NavSection value={filter} buttonFunc={handleShow} total={total} />
      <YoutubeSection contents={contents} />
    </main>
  );
};

export default HomePage;
