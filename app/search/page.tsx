'use client';
import Loading from '@/components/common/Loading';
import ChannelSection from '@/components/search/ChannelSection';
import ContentSection from '@/components/search/ContentSection';
import SearchSection from '@/components/search/SearchSection';
import SummarySection from '@/components/search/SummarySection';
import { useSearch } from '@/hooks/useSearch';

const SearchPage = () => {
  const { data, isLoading } = useSearch();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SearchSection />
          <SummarySection />
          <ContentSection contents={data.contents} />
          <ChannelSection channels={data.channels} />
        </>
      )}
    </>
  );
};

export default SearchPage;
