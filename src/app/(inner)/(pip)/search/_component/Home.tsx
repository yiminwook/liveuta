'use client';
import ChannelSection from './ChannelSection';
import ContentSection from './ContentSection';
import SearchSection from './SearchSection';
import SummarySection from './SummarySection';
import useResponsive from '@/hook/useResponsive';
import clientOnly from '@/model/clientOnly';
import { useSearch } from '@inner/_lib/getSheet';

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
