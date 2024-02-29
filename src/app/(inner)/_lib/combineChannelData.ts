import { getYoutubeChannels } from '@/model/youtube';
import { ChannelsDataType } from '@/type/api/youtube';
import { youtube_v3 } from 'googleapis';

export interface ChannelSheetDataType {
  [key: string]: {
    uid: string;
    channelName: string;
    url: string;
  };
}

/* YoutubeData API + Channel ID Sheet */
export const combineChannelData = async (
  sheetData: ChannelSheetDataType,
): Promise<ChannelsDataType[]> => {
  const idArr = [...Object.keys(sheetData)];
  if (idArr.length <= 0) return [];
  const youtubeData = await getYoutubeChannels(idArr);
  if (!youtubeData.items) throw new Error('No YoutubeData Items');

  const combinedSearchData: (youtube_v3.Schema$Channel & ChannelSheetDataType[string])[] = [];

  youtubeData.items.forEach((data) => {
    const id = data.id;
    if (!(id && sheetData[id])) return;
    const { uid, channelName } = sheetData[id];
    
    // Constructing the YouTube channel URL
    const youtubeChannelUrl = `https://www.youtube.com/channel/${uid}`;
    
    combinedSearchData.push({
      ...data,
      uid,
      channelName,
      url: youtubeChannelUrl, // Replacing 'url' with the YouTube channel URL
    });
  });
  
  // Sorting combined data by channelName
  const combinedSheetDataValues = combinedSearchData
    .sort((a, b) => a.channelName.localeCompare(b.channelName)) as ChannelsDataType[];

  return combinedSheetDataValues;
};
