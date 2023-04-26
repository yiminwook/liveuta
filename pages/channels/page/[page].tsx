import { ITEMS_PER_PAGE, PAGE_REVALIDATE_TIME } from '@/consts';
import { getYoutubeChannels } from '@/models/youtube/Channel';
import ChannelsPage, { ChannelsPageProps } from '@/pages/channels';
import getPaginationRange from '@/utils/GetPagenationRange';
import { parseChannelData } from '@/utils/ParseChannelData';
import { parseChannelSheet } from '@/utils/ParseChannelSheet';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

const ChannelsWithPage = (props: ChannelsPageProps) => {
  return <ChannelsPage {...props} />;
};

export default ChannelsWithPage;

interface ChannelsWithPageParams extends ParsedUrlQuery {
  page: string;
}

export const getStaticProps: GetStaticProps<ChannelsPageProps, ChannelsWithPageParams> = async ({ params }) => {
  const { page } = params!;

  /** Params */
  const pageQuery = Number(page);
  if (Number.isNaN(pageQuery)) throw new Error('PageQuery is not number');

  /* Google spread sheet API */
  const { totalLength, sheetDataValues } = await parseChannelSheet();
  const sliceData = sheetDataValues.slice(...getPaginationRange(pageQuery));

  /* YoutubeData API */
  const callYoubeAPI = sliceData.slice().map(([uid, _channelName, _url]) => {
    return getYoutubeChannels(uid);
  });

  const youtubeData = await Promise.all(callYoubeAPI);
  const channels = parseChannelData({ youtubeData, sheetData: sliceData });

  return {
    props: {
      totalLength,
      channels,
    },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  /* Google spread sheet API */
  const { totalLength } = await parseChannelSheet();
  const numberOfPages = Math.ceil(totalLength / ITEMS_PER_PAGE);
  const paths = Array.from({ length: numberOfPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
