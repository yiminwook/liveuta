import { ChannelsDataType } from '@/types/inYoutube';
import channels from '@/components/channels/Channels.module.scss';
import ChannelCard from '@/components/common/channelCard/ChannelCard';

interface ChannelSectionProps {
  contents: ChannelsDataType[];
}

const ChannelSection = ({ contents }: ChannelSectionProps) => {
  return (
    <section className={channels['channel-section']}>
      {contents.map((content) => (
        <ChannelCard key={content.uid} content={content} />
      ))}
      {contents.length === 0 ? <h2 className={channels['alert']}>채널이 존재하지 않습니다.</h2> : null}
    </section>
  );
};

export default ChannelSection;
