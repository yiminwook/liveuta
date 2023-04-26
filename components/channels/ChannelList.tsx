import { ChannelsDataType } from '@/models/youtube/InChannel';
import ChannelItem from './ChannelItem';
import channels from '@/styles/channel/Channel.module.scss';

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
