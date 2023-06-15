import { ITEMS_PER_PAGE, PAGE_REVALIDATE_TIME } from '@/consts';
import ChannelsPage, { ChannelsPageProps } from '@/pages/channels';
import getPaginationRange from '@/utils/petPagenationRange';
import { ChannelSheetDataType, combineChannelData } from '@/utils/combineChannelData';
import { parseChannelIDSheet } from '@/utils/parseChannelSheet';
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
  const { totalLength, sheetDataValues } = await parseChannelIDSheet();
  const sliceData = sheetDataValues.slice(...getPaginationRange(pageQuery));

  /* Youtube API */
  const channelSheetData: ChannelSheetDataType = {};
  sliceData.forEach(([uid, channelName, url]) => {
    if (channelSheetData[uid]) return;
    channelSheetData[uid] = { uid, channelName, url };
  });

  const combinedSearchDataValues = await combineChannelData(channelSheetData);

  return {
    props: {
      totalLength,
      contents: combinedSearchDataValues,
    },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  /* Google spread sheet API */
  const { totalLength } = await parseChannelIDSheet();
  const numberOfPages = Math.ceil(totalLength / ITEMS_PER_PAGE);

  const paths = Array.from({ length: numberOfPages }, (_, i) => {
    return { params: { page: (i + 1).toString() } };
  });

  return {
    paths,
    fallback: false,
  };
};
