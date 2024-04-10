'use server';
import { getAllChannel, searchChannel } from '@/model/mongoDB/getAllChannel';
import getPaginationRange from '@inner/_lib/getPagenationRange';
import { ChannelSheetDataType, combineChannelData } from '@inner/_lib/combineChannelData';

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

  return {
    totalLength: channels.length,
    contents: combinedSearchDataValues,
  };
}
