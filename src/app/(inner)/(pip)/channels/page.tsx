import { ITEMS_PER_PAGE } from '@/const';
import { ChannelSheetDataType, combineChannelData } from '@/util/combineChannelData';
import { parseChannelIDSheet } from '@/util/parseChannelSheet';
import Channels from '@/app/(inner)/(pip)/channels/_component/Home';
import { notFound } from 'next/navigation';

const getChannelData = async () => {
  try {
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
  } catch (error) {
    console.error(error);
    notFound();
  }
};

const ChannelsPage = async () => {
  const { totalLength, contents } = await getChannelData();
  return <Channels totalLength={totalLength} contents={contents} />;
};

export default ChannelsPage;

// export const revalidate = 1800;
