import { ITEMS_PER_PAGE } from '@/consts';
import { ChannelSheetDataType, combineChannelData } from '@/utils/combineChannelData';
import { parseChannelIDSheet } from '@/utils/parseChannelSheet';
import ChannelSection from '@/components/channels/ChannelSection';
import Pagination from '@/components/common/pagination/Pagination';

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
      <Pagination totalLength={totalLength} />
    </>
  );
};

export default ChannelsPage;
