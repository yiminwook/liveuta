'use client';
import NavSection from './header/NavSection';
import ScheduleSection from './ScheduleSection';
import useMongoDB from '@inner/_lib/getSchedule';
import { MongoDBAPIReturntype } from '@/type/api/mongoDB';
import dynamic from 'next/dynamic';

const TopSection = dynamic(() => import('./TopSection'), { ssr: false });

interface HomeProps {
  filter: keyof MongoDBAPIReturntype;
}

export default function Home({ filter }: HomeProps) {
  const { contents } = useMongoDB(filter);

  return (
    <main id="app">
      <NavSection filter={filter} />
      <TopSection filter={filter} />
      <ScheduleSection contents={contents} />
    </main>
  );
}
