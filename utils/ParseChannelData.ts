import { ChannelRowType, ChannelsDataType } from '@/models/youtube/InChannel';
import { youtube_v3 } from 'googleapis';

interface ParseChannelDataType {
  youtubeData: youtube_v3.Schema$ChannelListResponse[];
  sheetData: ChannelRowType[];
}

/* YoutubeData API */
export const parseChannelData = ({ youtubeData, sheetData }: ParseChannelDataType) => {
  if (youtubeData.length !== sheetData.length) throw new Error('DataLength is not same');
  const channels = youtubeData.reduce<ChannelsDataType[]>((acc, data, idx) => {
    if (!data.items) return acc;
    const items = data.items[0];
    const [uid, channelName, url] = sheetData[idx];
    const channel = { ...items, uid, channelName, url } as ChannelsDataType;
    return [...acc, channel];
  }, []);
  return channels;
};
