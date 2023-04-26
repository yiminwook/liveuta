import { ChannelsDataType } from '@/models/youtube/InChannel';
import ChannelItem from '@/components/channels/ChannelItem';
import channels from '@/styles/channels/Channels.module.scss';

interface ChannelListProps {
  contents: ChannelsDataType[];
}

const ChannelList = ({ contents }: ChannelListProps) => {
  return (
    <div className={channels['channel-list']}>
      {contents.map((content) => (
        <ChannelItem key={content.uid} content={content} />
      ))}
    </div>
  );
};

export default ChannelList;
