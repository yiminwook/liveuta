'use server';
import { ITEMS_PER_PAGE } from '@/constants';
import { getAllChannel, searchChannel } from '@/libraries/mongoDB/getAllChannel';
import { ChannelSheetDataType, combineChannelData } from '@/utils/combineChannelData';
import getPaginationRange from '@/utils/getPagenationRange';

export default async function getChannelData(
  page: number,
  { query }: { query: string | undefined },
) {
  /* Google spread sheet API */
  const channels = query ? await searchChannel(query) : await getAllChannel();
  const sliceData = channels.slice(...getPaginationRange(page));

  /* Youtube API */
  const channelSheetData: ChannelSheetDataType = {};

  sliceData.forEach((data) => {
    if (channelSheetData[data.channel_id]) return;
    channelSheetData[data.channel_id] = {
      uid: data.channel_id,
      channelName: data.name_kor,
      url: data.channel_addr,
    };
  });

  /* Youtube API */
  const combinedSearchDataValues = await combineChannelData(channelSheetData);

  const totalPage = Math.ceil(channels.length / ITEMS_PER_PAGE);

  return {
    totalPage,
    totalLength: channels.length,
    contents: combinedSearchDataValues,
  };
}
