import { ChannelsDataType } from '@/type/api/youtube';
import ChannelCard from '@inner/_component/channelCard/ChannelCard';
import * as styles from './home.css';

interface ChannelSectionProps {
  contents: ChannelsDataType[];
}

export default function ChannelSection({ contents }: ChannelSectionProps) {
  return (
    <section className={styles.channelSection}>
      {contents.map((content) => (
        <ChannelCard key={content.uid} content={content} />
      ))}
      {contents.length === 0 ? <h2 className={styles.alert}>채널이 존재하지 않습니다.</h2> : null}
    </section>
  );
}
