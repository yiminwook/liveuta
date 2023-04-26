import ChannelsSection from '@/components/channels/ChannelSection';
import { CHANNELS_SHEET_ID, CHANNELS_SHEET_RANGE, ITEMS_PER_PAGE, PAGE_REVALIDATE_TIME } from '@/consts';
import { getSheet } from '@/models/sheet/Sheets';
import { getYoutubeChannels } from '@/models/youtube/Channel';
import { ChannelRowType, ChannelsDataType } from '@/models/youtube/InChannel';
import getENV from '@/utils/GetENV';
import { GetStaticProps } from 'next';

export interface ChannelsPageProps {
  totalLength: number;
  channels: ChannelsDataType[];
}

const ChannelsPage = ({ channels, totalLength }: ChannelsPageProps) => {
  return (
    <div>
      <ChannelsSection channels={channels} totalLength={totalLength} />
    </div>
  );
};

export default ChannelsPage;

export const getStaticProps: GetStaticProps<ChannelsPageProps> = async ({}) => {
  /** Google spread sheet API */
  const spreadsheetId = getENV(CHANNELS_SHEET_ID);
  const range = getENV(CHANNELS_SHEET_RANGE);
  const sheetData = await getSheet({ spreadsheetId, range });
  const sheetDataValues = sheetData.values;
  if (!(sheetDataValues && sheetDataValues.length >= 2)) throw new Error('sheetData has not values');
  sheetDataValues.shift();
  const totalLength = sheetDataValues.length;
  const sliceData = sheetDataValues.slice(0, ITEMS_PER_PAGE) as ChannelRowType[];

  /** YoutubeData API */
  const callYoubeAPI = sliceData.slice().map(([uid, _channelName, _url]) => {
    return getYoutubeChannels(uid);
  });
  const yotubeData = await Promise.all(callYoubeAPI);
  const channels = yotubeData.reduce<ChannelsDataType[]>((acc, data, idx) => {
    if (!data.items) return acc;
    const items = data.items[0];
    const [uid, channelName, url] = sliceData[idx];
    const channel = { ...items, uid, channelName, url } as ChannelsDataType;
    return [...acc, channel];
  }, []);

  return {
    props: { channels, totalLength },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};
