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
