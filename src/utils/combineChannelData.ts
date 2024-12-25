import dayjs from '@/libraries/dayjs';
import { TChannelDto } from '@/libraries/mongoDB/getAllChannel';
import { getYoutubeChannels } from '@/libraries/youtube';
import { generateChannelUrl } from '@/libraries/youtube/url';
import { TChannelData } from '@/types/api/mongoDB';
import { TYChannelsData } from '@/types/api/youtube';

/* YoutubeData API + MongoDB Channel Data */
export const combineChannelData = async (
  mongoDBData: Record<string, TChannelData>,
  option: { sort: TChannelDto['sort'] },
): Promise<TYChannelsData[]> => {
  const idArr = Object.keys(mongoDBData);
  if (idArr.length <= 0) return [];

  const youtubeData = await getYoutubeChannels(idArr);

  if (!youtubeData.items) {
    console.warn('youtube api로 조회되지 않는 id', idArr.toString());
    return [];
  }

  const combinedSearchData = youtubeData.items.reduce<TYChannelsData[]>((acc, curr) => {
    const id = curr.id;
    if (!(id && mongoDBData[id])) return acc;
    const { channel_id, names, createdAt, alive } = mongoDBData[id];

    // Constructing the YouTube channel URL
    const youtubeChannelUrl = generateChannelUrl(channel_id);

    acc.push({
      ...curr,
      uid: channel_id,
      channelName: names,
      createdAt,
      url: youtubeChannelUrl, // Replacing 'url' with the YouTube channel URL
      alive,
    });

    return acc;
  }, []);

  const sortedChannelData = combinedSearchData.sort((a, b) => {
    if (option.sort === 'createdAt') {
      // Sorting combined data by createdAt
      return dayjs(b.createdAt).diff(dayjs(a.createdAt));
    }

    // Sorting combined data by channelName with English locale
    return a.channelName.localeCompare(b.channelName, 'en', { sensitivity: 'base' });
  });

  return sortedChannelData;
};
