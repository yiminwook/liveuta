import ChannelSection from '@/components/channels/ChannelSection';
import Pagination from '@/components/common/pagination/Pagination';
import HorizonScrollBox from '@/components/common/HorizonScrollBox';
import channels from '@/components/channels/Channels.module.scss';
import { ChannelsDataType } from '@/type/inYoutube';

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
