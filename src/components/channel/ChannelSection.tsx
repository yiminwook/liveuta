'use client';
import { TChannelsData as TChannelsData } from '@/types/api/youtube';
import { Session } from '@auth/core/types';
import Nodata from '@/components/common/Nodata';
import ChannelCard from '@/components/common/channelCard/ChannelCard';
import * as styles from './home.css';
import useCachedData from '@/hooks/useCachedData';

type ChannelSectionProps = {
  contents: TChannelsData[];
  session: Session | null;
};

export default function ChannelSection({ contents, session }: ChannelSectionProps) {
  const { whiteList } = useCachedData({ session });
  return (
    <section className={styles.channelSection}>
      {contents.map((content) => (
        <ChannelCard
          key={content.uid}
          content={content}
          session={session}
          isFavorite={whiteList.has(content.uid)}
        />
      ))}
      {contents.length === 0 && <Nodata />}
    </section>
  );
}
