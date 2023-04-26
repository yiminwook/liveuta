import { ChannelsDataType } from '@/models/youtube/InChannel';
import Pagination from '../common/Pagination';
import ChannelList from './ChannelList';
import channels from '@/styles/channel/Channel.module.scss';

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
