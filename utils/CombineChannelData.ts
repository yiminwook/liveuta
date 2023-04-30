import { getYoutubeChannels } from '@/models/youtube/Channel';
import { ChannelRowType, ChannelsDataType } from '@/models/youtube/InChannel';
import { youtube_v3 } from 'googleapis';

interface CombineChannelDataType {
  youtubeData: youtube_v3.Schema$ChannelListResponse[];
  sheetData: ChannelRowType[];
}

/* YoutubeData API + Channel ID Sheet */
export const combineChannelData = ({ youtubeData, sheetData }: CombineChannelDataType) => {
  if (youtubeData.length !== sheetData.length) throw new Error('DataLength is not same');
  const combinedData = youtubeData.reduce<ChannelsDataType[]>((acc, data, idx) => {
    if (!data.items) return acc;
    const items = data.items[0];
    const [uid, channelName, url] = sheetData[idx];
    const channel = { ...items, uid, channelName, url } as ChannelsDataType;
    return [...acc, channel];
  }, []);
  return combinedData;
};

export interface ChannelSheetDataType {
  [key: string]: {
    uid: string;
    channelName: string;
    url: string;
  };
}

/* YoutubeData API + Channel ID Sheet */
export const combineChannelItemData = async (sheetData: ChannelSheetDataType): Promise<ChannelsDataType[]> => {
  const idArr = [...Object.keys(sheetData)];
  const youtubeData = await getYoutubeChannels(idArr);
  if (!youtubeData.items) throw new Error('No YoutubeData Items');
  if (idArr.length !== youtubeData.items.length) throw new Error('DataLength is not same');
  const combinedSearchData: Record<string, youtube_v3.Schema$Channel & ChannelSheetDataType[string]> = {};
  youtubeData.items.forEach((data) => {
    const id = data.id;
    if (!(id && sheetData[id])) return;
    const { uid, channelName, url } = sheetData[id];
    combinedSearchData[uid] = {
      ...data,
      uid,
      channelName,
      url,
    };
  });
  const combinedSheetDataValues = [...Object.values(combinedSearchData)] as ChannelsDataType[];
  return combinedSheetDataValues;
};
