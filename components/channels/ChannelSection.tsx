import { ChannelsDataType } from '@/models/youtube/InChannel';
import Pagination from '@/components/common/Pagination';
import ChannelList from '@/components/channels/ChannelList';
import channels from '@/styles/channels/Channels.module.scss';

interface ChannelSectionProps {
  contents: ChannelsDataType[];
  totalLength: number;
}

const ChannelSection = ({ contents, totalLength }: ChannelSectionProps) => {
  return (
    <section className={channels['channel-section']}>
      <ChannelList contents={contents} />
      <Pagination totalLength={totalLength} />
    </section>
  );
};

export default ChannelSection;
