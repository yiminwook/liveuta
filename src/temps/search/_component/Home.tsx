'use client';
import { Session } from 'next-auth';
import ChannelSection from './ChannelSection';
import ContentSection from './ContentSection';
import SearchSection from './SearchSection';
import SummarySection from './SummarySection';
import { useSearch } from '@/components/search/getSearch';
import MainLoading from '@/components/common/loading/MainLoading';

type HomeProps = {
  session: Session | null;
};
export default function Home({ session }: HomeProps) {
  const { searchData, isLoadingSearch } = useSearch();

  if (isLoadingSearch) return <MainLoading backdrop={true} />;

  return (
    <>
      <SearchSection />
      <SummarySection />
      <ContentSection session={session} contents={searchData.contents} />
      <ChannelSection channels={searchData.channels} />
    </>
  );
}
