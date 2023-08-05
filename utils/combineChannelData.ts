import { getYoutubeChannels } from '@/models/sheet/youtube';
import { ChannelsDataType } from '@/types/inYoutube';
import { youtube_v3 } from 'googleapis';

export interface ChannelSheetDataType {
  [key: string]: {
    uid: string;
    channelName: string;
    url: string;
  };
}

/* YoutubeData API + Channel ID Sheet */
export const combineChannelData = async (sheetData: ChannelSheetDataType): Promise<ChannelsDataType[]> => {
  const idArr = [...Object.keys(sheetData)];
  if (idArr.length <= 0) return [];
  const youtubeData = await getYoutubeChannels(idArr);
  if (!youtubeData.items) throw new Error('No YoutubeData Items');

  const combinedSearchData: (youtube_v3.Schema$Channel & ChannelSheetDataType[string])[] = [];

  youtubeData.items.forEach((data) => {
    const id = data.id;
    if (!(id && sheetData[id])) return;
    const { uid, channelName, url } = sheetData[id];

    combinedSearchData.push({
      ...data,
      uid,
      channelName,
      url,
    });
  });

  const combinedSheetDataValues = combinedSearchData.sort((a, b) => {
    const A = a.channelName;
    const B = b.channelName;
    if (A < B) return -1;
    if (A > B) return 1;
    else return 0;
  }) as ChannelsDataType[];

  return combinedSheetDataValues;
};
