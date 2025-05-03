'use client';
import Nodata from '@/components/common/Nodata';
import ChannelCard from '@/components/common/channelCard/ChannelCard';
import useCachedData from '@/hooks/useCachedData';
import { useLocale } from '@/libraries/i18n/client';
import { TYChannelsData } from '@/types/api/youtube';
import { useSession } from 'next-auth/react';
import css from './Home.module.scss';

type ChannelSectionProps = {
  contents: TYChannelsData[];
};

export default function ChannelSection({ contents }: ChannelSectionProps) {
  const { data: session } = useSession();
  const locale = useLocale();
  const { whiteListMap } = useCachedData({ session });

  return (
    <section className={css.channelSection}>
      {contents.map((content) => (
        <ChannelCard
          key={content.uid}
          content={content}
          session={session}
          isFavorite={whiteListMap.has(content.uid)}
        />
      ))}
      {contents.length === 0 && <Nodata />}
    </section>
  );
}
