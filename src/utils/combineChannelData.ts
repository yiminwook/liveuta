import { getYoutubeChannels } from '@/libraries/youtube';
import { generateChannelUrl } from '@/libraries/youtube/url';
import { TYChannelsData } from '@/types/api/youtube';
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
): Promise<TYChannelsData[]> => {
  const idArr = [...Object.keys(sheetData)];
  if (idArr.length <= 0) return [];

  const youtubeData = await getYoutubeChannels(idArr);

  if (!youtubeData.items) {
    console.warn('youtube api로 조회되지 않는 id', idArr.toString());
    return [];
  }

  const combinedSearchData: (youtube_v3.Schema$Channel & ChannelSheetDataType[string])[] = [];

  youtubeData.items.forEach((data) => {
    const id = data.id;
    if (!(id && sheetData[id])) return;
    const { uid, channelName } = sheetData[id];

    // Constructing the YouTube channel URL
    const youtubeChannelUrl = generateChannelUrl(uid);

    combinedSearchData.push({
      ...data,
      uid,
      channelName,
      url: youtubeChannelUrl, // Replacing 'url' with the YouTube channel URL
    });
  });

  // Sorting combined data by channelName
  const combinedSheetDataValues = combinedSearchData.sort((a, b) =>
    a.channelName.localeCompare(b.channelName),
  ) as TYChannelsData[];

  return combinedSheetDataValues;
};
