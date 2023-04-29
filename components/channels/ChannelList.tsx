import { ChannelsDataType } from '@/models/youtube/InChannel';
import ChannelItem from '@/components/common/ChannelCard';
import channels from '@/styles/channels/Channels.module.scss';

interface ChannelListProps {
  contents: ChannelsDataType[];
}

const ChannelList = ({ contents }: ChannelListProps) => {
  return (
    <section className={channels['channel-section']}>
      {contents.map((content) => (
        <ChannelItem key={content.uid} content={content} />
      ))}
    </section>
  );
};

export default ChannelList;
