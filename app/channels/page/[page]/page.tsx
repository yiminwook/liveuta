// import { ITEMS_PER_PAGE } from '@/consts';
import getPaginationRange from '@/utils/getPagenationRange';
import { ChannelSheetDataType, combineChannelData } from '@/utils/combineChannelData';
import { parseChannelIDSheet } from '@/utils/parseChannelSheet';
import Channels from '@/app/channels/page.client';
import { notFound } from 'next/navigation';

// export const generateStaticParams = async (): Promise<ChannelsWithPageParams[]> => {
//   /* Google spread sheet API */
//   const { totalLength } = await parseChannelIDSheet();
//   const numberOfPages = Math.ceil(totalLength / ITEMS_PER_PAGE);

//   const paths = Array.from({ length: numberOfPages }, (_, i) => {
//     return { page: (i + 1).toString() };
//   });

//   return paths;
// };

const getChannelData = async (page: string) => {
  try {
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
  } catch (error) {
    console.error(error);
    notFound();
  }
};

interface ChannelsWithPageParams {
  page: string;
}
interface ChannelsWithPageProps {
  params: ChannelsWithPageParams;
}

const ChannelsWithPage = async ({ params }: ChannelsWithPageProps) => {
  const { totalLength, contents } = await getChannelData(params.page);
  return <Channels totalLength={totalLength} contents={contents} />;
};

export default ChannelsWithPage;

// export const revalidate = 1800;
