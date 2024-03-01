import { ITEMS_PER_PAGE } from '@/const';
import { ChannelSheetDataType, combineChannelData } from '@inner/_lib/combineChannelData';
import { getAllChannel } from '@/model/mongoDB/getAllChannel';
import { notFound } from 'next/navigation';
import Home from './_component/Home';
import { disconnectMongoDB } from '@/model/mongoDB';

const getChannelData = async () => {
  try {
    /* Google spread sheet API */
    const { totalLength, channels } = await getAllChannel();
    const sliceData = channels.slice(0, ITEMS_PER_PAGE);

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
    return {
      totalLength,
      contents: combinedSearchDataValues,
    };
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export default async function Page() {
  const { totalLength, contents } = await getChannelData();
  return <Home totalLength={totalLength} contents={contents} />;
}
