import { TChannelDocumentWithoutId } from '@/libraries/mongodb/type';
import { generateChannelUrl } from '@/libraries/youtube/url';
import { TYChannelsData } from '@/types/api/youtube';
import { youtube_v3 } from 'googleapis';

// refactor
export const combineYTData = (
  channelData: Record<string, TChannelDocumentWithoutId>,
  youtubeData: youtube_v3.Schema$Channel[],
) => {
  return youtubeData.reduce<TYChannelsData[]>((acc, curr) => {
    const id = curr.id;
    const channel = channelData[id!];
    if (!(id && channel)) return acc;
    const { channel_id, name_kor, createdAt, alive } = channel;
    const youtubeChannelUrl = generateChannelUrl(channel_id);

    acc.push({
      ...curr,
      uid: channel_id,
      nameKor: name_kor,
      createdAt,
      url: youtubeChannelUrl,
      alive,
    });
    return acc;
  }, []);
};

export function combineSingleYTData(
  channelData: TChannelDocumentWithoutId,
  youtubeData: youtube_v3.Schema$Channel,
): TYChannelsData {
  return {
    ...youtubeData,
    uid: channelData.channel_id,
    nameKor: channelData.name_kor,
    createdAt: channelData.createdAt,
    url: generateChannelUrl(channelData.channel_id),
    alive: channelData.alive,
  };
}
