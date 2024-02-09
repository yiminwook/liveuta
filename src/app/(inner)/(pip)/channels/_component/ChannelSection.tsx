import { ChannelsDataType } from '@/type/api/youtube';
import channels from './channels.module.scss';
import ChannelCard from '@inner/_component/channelCard/ChannelCard';

interface ChannelSectionProps {
  contents: ChannelsDataType[];
}

export default function ChannelSection({ contents }: ChannelSectionProps) {
  return (
    <section className={channels['channel-section']}>
      {contents.map((content) => (
        <ChannelCard key={content.uid} content={content} />
      ))}
      {contents.length === 0 ? (
        <h2 className={channels['alert']}>채널이 존재하지 않습니다.</h2>
      ) : null}
    </section>
  );
}
