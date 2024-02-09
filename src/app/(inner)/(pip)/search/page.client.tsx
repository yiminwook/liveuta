'use client';
import ChannelSection from '@inner/(pip)/search/_component/ChannelSection';
import ContentSection from '@inner/(pip)/search/_component/ContentSection';
import SearchSection from '@inner/(pip)/search/_component/SearchSection';
import SummarySection from '@inner/(pip)/search/_component/SummarySection';
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
