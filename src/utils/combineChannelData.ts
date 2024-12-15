import dayjs from '@/libraries/dayjs';
import { getYoutubeChannels } from '@/libraries/youtube';
import { generateChannelUrl } from '@/libraries/youtube/url';
import { TYChannelsData } from '@/types/api/youtube';
import { youtube_v3 } from 'googleapis';

export interface TMongoDBChannelData {
  [key: string]: {
    uid: string;
    channelName: string;
    url: string;
    createdAt: string;
    alive: boolean;
  };
}

/* YoutubeData API + MongoDB Channel Data */
export const combineChannelData = async (
  mongoDBData: TMongoDBChannelData,
  option: { sort?: 'createAt' | 'name_kor' } = { sort: 'name_kor' },
): Promise<TYChannelsData[]> => {
  const idArr = [...Object.keys(mongoDBData)];
  if (idArr.length <= 0) return [];

  const youtubeData = await getYoutubeChannels(idArr);

  if (!youtubeData.items) {
    console.warn('youtube api로 조회되지 않는 id', idArr.toString());
    return [];
  }

  const combinedSearchData: (youtube_v3.Schema$Channel & TMongoDBChannelData[string])[] = [];

  youtubeData.items.forEach((i) => {
    const id = i.id;
    if (!(id && mongoDBData[id])) return;
    const { uid, channelName, createdAt, alive } = mongoDBData[id];

    // Constructing the YouTube channel URL
    const youtubeChannelUrl = generateChannelUrl(uid);

    combinedSearchData.push({
      ...i,
      uid,
      channelName,
      createdAt,
      url: youtubeChannelUrl, // Replacing 'url' with the YouTube channel URL
      alive,
    });
  });

  if (option.sort === 'createAt') {
    // Sorting combined data by createdAt
    const combinedSheetDataValues = combinedSearchData.sort((a, b) =>
      dayjs(b.createdAt).diff(dayjs(a.createdAt)),
    ) as TYChannelsData[];
    return combinedSheetDataValues;
  }

  // Sorting combined data by channelName
  const combinedSheetDataValues = combinedSearchData.sort((a, b) =>
    a.channelName.localeCompare(b.channelName),
  ) as TYChannelsData[];

  return combinedSheetDataValues;
};
