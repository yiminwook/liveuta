import ChannelSection from '@/components/channels/ChannelSection';
import { ITEMS_PER_PAGE, PAGE_REVALIDATE_TIME } from '@/consts';
import { getYoutubeChannels } from '@/models/youtube/Channel';
import { ChannelsDataType } from '@/models/youtube/InChannel';
import { combineChannelData } from '@/utils/ParseChannelData';
import { parseChannelIDSheet } from '@/utils/ParseChannelSheet';
import { GetStaticProps } from 'next';
import channels from '@/styles/channels/Channels.module.scss';

export interface ChannelsPageProps {
  totalLength: number;
  contents: ChannelsDataType[];
}

const ChannelsPage = ({ contents, totalLength }: ChannelsPageProps) => {
  return (
    <div className={channels['main']}>
      <ChannelSection contents={contents} totalLength={totalLength} />
    </div>
  );
};

export default ChannelsPage;

export const getStaticProps: GetStaticProps<ChannelsPageProps> = async ({}) => {
  /* Google spread sheet API */
  const { totalLength, sheetDataValues } = await parseChannelIDSheet();
  const sliceData = sheetDataValues.slice(0, ITEMS_PER_PAGE);

  /* YoutubeData API */
  const callYoubeAPI = sliceData.slice().map(([uid, _channelName, _url]) => {
    return getYoutubeChannels(uid);
  });

  const youtubeData = await Promise.all(callYoubeAPI);
  const contents = combineChannelData({ youtubeData, sheetData: sliceData });

  return {
    props: { contents, totalLength },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};