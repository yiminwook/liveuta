import { ChannelsDataType } from '@/type/api/youtube';
import HorizonScrollBox from '@inner/_component/HorizonScrollBox';
import Pagination from '@inner/(pip)/channels/_component/pagination/Pagination';
import ChannelSection from './ChannelSection';
import channels from './channels.module.scss';

interface HomeProps {
  totalLength: number;
  contents: ChannelsDataType[];
}

export default function Home({ totalLength, contents }: HomeProps) {
  return (
    <>
      <ChannelSection contents={contents} />
      <HorizonScrollBox className={channels['pagination']}>
        <Pagination totalLength={totalLength} />
      </HorizonScrollBox>
    </>
  );
}
