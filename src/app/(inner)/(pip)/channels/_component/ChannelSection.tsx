import { ChannelsDataType } from '@/type/api/youtube';
import { Session } from '@auth/core/types';
import Nodata from '@inner/_component/Nodata';
import ChannelCard from '@inner/_component/channelCard/ChannelCard';
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
