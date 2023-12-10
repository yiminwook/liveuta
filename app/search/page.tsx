'use client';
import Loading from '@/components/layout/Loading';
import ChannelSection from '@/components/search/ChannelSection';
import ContentSection from '@/components/search/ContentSection';
import SearchSection from '@/components/search/SearchSection';
import SummarySection from '@/components/search/SummarySection';
import { useSearch } from '@/queries/search';

const SearchPage = () => {
  const { searchData } = useSearch();

  return (
    <>
      <SearchSection />
      <SummarySection />
      <ContentSection contents={searchData.contents} />
      <ChannelSection channels={searchData.channels} />
    </>
  );
};

export default SearchPage;
