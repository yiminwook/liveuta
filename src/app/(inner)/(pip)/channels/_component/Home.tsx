import { ChannelsDataType } from '@/type/api/youtube';
import HorizonScrollBox from '@inner/_component/HorizonScrollBox';
import Pagination from '@inner/_component/pagination/Pagination';
import ChannelSection from './ChannelSection';
import channels from './channels.module.scss';

interface ChannelsProps {
  totalLength: number;
  contents: ChannelsDataType[];
}

const Channels = ({ totalLength, contents }: ChannelsProps) => {
  return (
    <>
      <ChannelSection contents={contents} />
      <HorizonScrollBox className={channels['pagination']}>
        <Pagination totalLength={totalLength} />
      </HorizonScrollBox>
    </>
  );
};

export default Channels;
