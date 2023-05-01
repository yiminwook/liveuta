import { ChannelsDataType } from '@/models/youtube/inYoutube';
import channels from '@/styles/channels/Channels.module.scss';
import ChannelCard from '@/components/common/ChannelCard';

interface ChannelSectionProps {
  contents: ChannelsDataType[];
}

const ChannelSection = ({ contents }: ChannelSectionProps) => {
  return (
    <section className={channels['channel-section']}>
      {contents.map((content) => (
        <ChannelCard key={content.uid} content={content} />
      ))}
    </section>
  );
};

export default ChannelSection;
