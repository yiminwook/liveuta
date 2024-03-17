import { ChannelSheetDataType, combineChannelData } from '@inner/_lib/combineChannelData';
import { getAllChannel } from '@/model/mongoDB/getAllChannel';
import { notFound } from 'next/navigation';
import Home from './_component/Home';
import { disconnectMongoDB } from '@/model/mongoDB';
import getPaginationRange from '@inner/_lib/getPagenationRange';

const getChannelData = async (page: number) => {
  try {
    if (Number.isNaN(page)) {
      throw new Error('searchParams Page가 숫자가 아님');
    }
    /* Google spread sheet API */
    const { totalLength, channels } = await getAllChannel();
    const sliceData = channels.slice(...getPaginationRange(page));

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

    /* Youtube API */
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

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const page = Number(searchParams.page || 1);
  const { totalLength, contents } = await getChannelData(page);
  return <Home totalLength={totalLength} contents={contents} currentPage={page} />;
}
