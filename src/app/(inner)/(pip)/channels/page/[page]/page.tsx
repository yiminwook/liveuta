import { ChannelSheetDataType, combineChannelData } from '@inner/_lib/combineChannelData';
import getPaginationRange from '@inner/_lib/getPagenationRange';
import { parseChannelIDSheet } from '@inner/_lib/parseChannelSheet';
import { notFound } from 'next/navigation';
import Home from '../../_component/Home';

const getChannelData = async (page: string) => {
  try {
    const pageQuery = Number(page);
    if (Number.isNaN(pageQuery)) {
      throw new Error('PageQuery가 숫자가 아님');
    }

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

    if (combinedSearchDataValues.length === 0) {
      throw new Error('조회된 데이터 없음');
    }

    return {
      totalLength,
      contents: combinedSearchDataValues,
    };
  } catch (error) {
    console.error(error);
    notFound();
  }
};

interface PageProps {
  params: {
    page: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { totalLength, contents } = await getChannelData(params.page);
  return <Home totalLength={totalLength} contents={contents} />;
}
