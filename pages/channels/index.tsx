import ChannelsSection from '@/components/channels/ChannelSection';
import { ITEMS_PER_PAGE, PAGE_REVALIDATE_TIME } from '@/consts';
import { getYoutubeChannels } from '@/models/youtube/Channel';
import { ChannelsDataType } from '@/models/youtube/InChannel';
import { parseChannelData } from '@/utils/ParseChannelData';
import { parseChannelSheet } from '@/utils/ParseChannelSheet';
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
  /* Google spread sheet API */
  const { totalLength, sheetDataValues } = await parseChannelSheet();
  const sliceData = sheetDataValues.slice(0, ITEMS_PER_PAGE);

  /* YoutubeData API */
  const callYoubeAPI = sliceData.slice().map(([uid, _channelName, _url]) => {
    return getYoutubeChannels(uid);
  });

  const youtubeData = await Promise.all(callYoubeAPI);
  const channels = parseChannelData({ youtubeData, sheetData: sliceData });

  return {
    props: { channels, totalLength },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};
