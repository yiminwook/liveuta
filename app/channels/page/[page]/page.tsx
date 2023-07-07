import { ITEMS_PER_PAGE } from '@/consts';
import getPaginationRange from '@/utils/petPagenationRange';
import { ChannelSheetDataType, combineChannelData } from '@/utils/combineChannelData';
import { parseChannelIDSheet } from '@/utils/parseChannelSheet';
import ChannelSection from '@/components/channels/ChannelSection';
import Pagination from '@/components/common/pagination/Pagination';

interface ChannelsWithPageParams {
  page: string;
}

export const generateStaticParams = async (): Promise<ChannelsWithPageParams[]> => {
  /* Google spread sheet API */
  const { totalLength } = await parseChannelIDSheet();
  const numberOfPages = Math.ceil(totalLength / ITEMS_PER_PAGE);

  const paths = Array.from({ length: numberOfPages }, (_, i) => {
    return { page: (i + 1).toString() };
  });

  return paths;
};

const getChannelData = async (page: string) => {
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
    totalLength,
    contents: combinedSearchDataValues,
  };
};

interface ChannelsWithPageProps {
  params: ChannelsWithPageParams;
}

const ChannelsWithPage = async ({ params }: ChannelsWithPageProps) => {
  const { totalLength, contents } = await getChannelData(params.page);

  return (
    <>
      <ChannelSection contents={contents} />
      <Pagination totalLength={totalLength} />
    </>
  );
};

export default ChannelsWithPage;
