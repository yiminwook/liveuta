'use client';
import ChannelSection from './ChannelSection';
import ContentSection from './ContentSection';
import SearchSection from './SearchSection';
import SummarySection from './SummarySection';
import { useSearch } from '@inner/_lib/getSearch';

export default function Home() {
  const { searchData } = useSearch();

  return (
    <main id="app">
      <SearchSection />
      <SummarySection />
      <ContentSection contents={searchData.contents} />
      <ChannelSection channels={searchData.channels} />
    </main>
  );
}
