import { ChannelsDataType } from '@/type/api/youtube';
import Pagination from '@inner/(pip)/channels/_component/pagination/Pagination';
import ChannelSection from './ChannelSection';

interface HomeProps {
  totalLength: number;
  contents: ChannelsDataType[];
}

export default function Home({ totalLength, contents }: HomeProps) {
  return (
    <>
      <ChannelSection contents={contents} />
      <Pagination totalLength={totalLength} />
    </>
  );
}
