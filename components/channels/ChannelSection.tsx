import { ChannelsDataType } from '@/models/youtube/InChannel';
import Pagination from '../common/Pagination';
import ChannelList from './ChannelList';

interface ChannelsSectionProps {
  channels: ChannelsDataType[];
  totalLength: number;
}

const ChannelsSection = ({ channels, totalLength }: ChannelsSectionProps) => {
  return (
    <section>
      <ChannelList channels={channels} />
      <Pagination totalLength={totalLength} />
    </section>
  );
};

export default ChannelsSection;
