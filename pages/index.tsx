import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { ContentsDataType } from '@/models/sheet/InSheet';
import useScheduledData from '@/hooks/UseScheduledData';
import home from '@/styles/home/Home.module.scss';
import useAllData from '@/hooks/UseAllData';
import NavSection from '@/components/home/NavSection';
import YoutubeSection from '@/components/home/YoutubeSection';
import Loading from '@/components/common/Loading';
import useDailyData from '@/hooks/UseDailyData';
import useLiveData from '@/hooks/UseLiveData';

export interface HomePageProps {
  filter?: 'live' | 'daily' | 'all';
}

const HomePage: NextPage<HomePageProps> = ({ filter }) => {
  const { data: scheduledData, isLoading: scheduledLoading } = useScheduledData();
  const { data: liveData, isLoading: liveLoading } = useLiveData();
  const { data: dailyData, isLoading: dailyLoading } = useDailyData();
  const { data: allData, isLoading: allDataLoading } = useAllData();

  const [contents, setContents] = useState<ContentsDataType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const setData = () => {
    let data: ContentsDataType[] | undefined;
    let count: number | undefined;
    switch (filter) {
      case 'live':
        data = liveData?.contents;
        count = liveData?.total;
        break;
      case 'daily':
        data = dailyData?.contents;
        count = dailyData?.total;
        break;
      case 'all':
        data = allData?.contents;
        count = allData?.total;
        break;
      default:
        data = scheduledData?.contents;
        count = scheduledData?.total;
    }

    setContents(() => [...(data ?? [])]);
    setTotal(() => count ?? 0);
  };

  useEffect(() => {
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, scheduledData, liveData, dailyData, allData]);

  if (scheduledLoading || liveLoading || dailyLoading || allDataLoading) {
    return <Loading />;
  }

  return (
    <main className={home['main']}>
      <NavSection total={total} />
      <YoutubeSection contents={contents} />
    </main>
  );
};

export default HomePage;
