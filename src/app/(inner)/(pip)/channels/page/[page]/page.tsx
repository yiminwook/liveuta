import { ChannelSheetDataType, combineChannelData } from '@inner/_lib/combineChannelData';
import getPaginationRange from '@inner/_lib/getPagenationRange';
import { parseChannelIDSheet } from '@inner/_lib/parseChannelSheet';
import { notFound } from 'next/navigation';
import Home from '../../_component/Home';
import { disconnectMongoDB } from '@/model/mongoDB';

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

    sliceData.forEach((data) => {
      if (channelSheetData[data.channel_id]) return;
      channelSheetData[data.channel_id] = {
        uid: data.channel_id,
        channelName: data.name_kor,
        url: data.channel_addr,
      };
    });

    const combinedSearchDataValues = await combineChannelData(channelSheetData);

    disconnectMongoDB();
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
