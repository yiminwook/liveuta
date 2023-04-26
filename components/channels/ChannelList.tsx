import { ChannelsDataType } from '@/models/youtube/InChannel';
import ChannelItem from './ChannelItem';

interface ChannelListProps {
  channels: ChannelsDataType[];
}

const ChannelList = ({ channels }: ChannelListProps) => {
  return (
    <table>
      <th>photo</th>
      <th></th>
      <th></th>
      {channels.map((channel) => (
        <ChannelItem key={channel.uid} channel={channel} />
      ))}
    </table>
  );
};

export default ChannelList;
