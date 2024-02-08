'use client';
import ChannelSection from '@/components/search/ChannelSection';
import ContentSection from '@/components/search/ContentSection';
import SearchSection from '@/components/search/SearchSection';
import SummarySection from '@/components/search/SummarySection';
import useResponsive from '@/hook/useResponsive';
import clientOnly from '@/model/clientOnly';
import { useSearch } from '@/queries/search';

const Client = () => {
  const { searchData } = useSearch();
  const { isMobile } = useResponsive();

  return (
    <>
      <SearchSection />
      <SummarySection />
      <ContentSection contents={searchData.contents} isMobile={isMobile} />
      <ChannelSection channels={searchData.channels} />
    </>
  );
};

export default clientOnly(Client);
