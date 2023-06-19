import { ITEMS_PER_PAGE, PAGE_REVALIDATE_TIME } from '@/consts';
import { ChannelsDataType } from '@/types/inYoutube';
import { ChannelSheetDataType, combineChannelData } from '@/utils/combineChannelData';
import { parseChannelIDSheet } from '@/utils/parseChannelSheet';
import { GetStaticProps } from 'next';
import channels from '@/styles/channels/Channels.module.scss';
import ChannelSection from '@/components/channels/ChannelSection';
import Pagination from '@/components/common/pagination/Pagination';

export interface ChannelsPageProps {
  totalLength: number;
  contents: ChannelsDataType[];
}

const ChannelsPage = ({ contents, totalLength }: ChannelsPageProps) => {
  return (
    <section className={channels['main']}>
      <ChannelSection contents={contents} />
      <Pagination totalLength={totalLength} />
    </section>
  );
};

export default ChannelsPage;

export const getStaticProps: GetStaticProps<ChannelsPageProps> = async ({}) => {
  /* Google spread sheet API */
  const { totalLength, sheetDataValues } = await parseChannelIDSheet();
  const sliceData = sheetDataValues.slice(0, ITEMS_PER_PAGE);

  /* Youtube API */
  const channelSheetData: ChannelSheetDataType = {};
  sliceData.forEach(([uid, channelName, url]) => {
    if (channelSheetData[uid]) return;
    channelSheetData[uid] = { uid, channelName, url };
  });

  /* Youtube API */
  const combinedSearchDataValues = await combineChannelData(channelSheetData);

  return {
    props: {
      totalLength,
      contents: combinedSearchDataValues,
    },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};
