import { ChannelsDataType } from '@/types/api/youtube';
import { Session } from '@auth/core/types';
import Nodata from '@/components/common/Nodata';
import ChannelCard from '@/components/common/channelCard/ChannelCard';
import * as styles from './home.css';

type ChannelSectionProps = {
  contents: ChannelsDataType[];
  session: Session | null;
};

export default function ChannelSection({ contents, session }: ChannelSectionProps) {
  return (
    <section className={styles.channelSection}>
      {contents.map((content) => (
        <ChannelCard key={content.uid} content={content} session={session} />
      ))}
      {contents.length === 0 && <Nodata />}
    </section>
  );
}
