import { ITEMS_PER_PAGE, PAGE_REVALIDATE_TIME } from '@/consts';
import { ChannelSheetDataType, combineChannelData } from '@/utils/combineChannelData';
import { parseChannelIDSheet } from '@/utils/parseChannelSheet';
import ChannelSection from '@/components/channels/ChannelSection';
import Pagination from '@/components/common/pagination/Pagination';
import HorizonScrollBox from '@/components/common/HorizonScrollBox';
import channels from '@/components/channels/Channels.module.scss';

const getChannelData = async () => {
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
    totalLength,
    contents: combinedSearchDataValues,
  };
};

const ChannelsPage = async () => {
  const { totalLength, contents } = await getChannelData();

  return (
    <>
      <ChannelSection contents={contents} />
      <HorizonScrollBox className={channels['pagination']}>
        <Pagination totalLength={totalLength} />
      </HorizonScrollBox>
    </>
  );
};

export default ChannelsPage;

export const revalidate = PAGE_REVALIDATE_TIME;
