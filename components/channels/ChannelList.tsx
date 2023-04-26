import { ChannelsDataType } from '@/models/youtube/InChannel';
import ChannelItem from './ChannelItem';

interface ChannelListProps {
  channels: ChannelsDataType[];
}

const ChannelList = ({ channels }: ChannelListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>프로필</th>
          <th>채널</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {channels.map((channel) => (
          <ChannelItem key={channel.uid} channel={channel} />
        ))}
      </tbody>
    </table>
  );
};

export default ChannelList;
