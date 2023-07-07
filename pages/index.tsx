import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { ContentsDataType, SheetAPIReturntype } from '@/types/inSheet';
import useSheet from '@/hooks/useSheet';
import home from '@/styles/home/Home.module.scss';
import NavSection from '@/components/home/NavSection';
import ScheduleSection from '@/components/home/ScheduleSection';
import Loading from '@/components/common/Loading';

export interface HomePageProps {
  filter?: keyof SheetAPIReturntype;
}

const HomePage: NextPage<HomePageProps> = ({ filter = 'scheduled' }) => {
  const { data, isLoading } = useSheet();

  const [contents, setContents] = useState<ContentsDataType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const setData = () => {
    if (!data) return;
    setContents(() => data[filter].contents);
    setTotal(() => data[filter].total);
  };

  useEffect(() => {
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <NavSection total={total} />
      <ScheduleSection contents={contents} />
    </>
  );
};

export default HomePage;
