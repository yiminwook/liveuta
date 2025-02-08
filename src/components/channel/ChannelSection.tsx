'use client';
import Nodata from '@/components/common/Nodata';
import ChannelCard from '@/components/common/channelCard/ChannelCard';
import useCachedData from '@/hooks/useCachedData';
import { TYChannelsData } from '@/types/api/youtube';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import css from './Home.module.scss';

type ChannelSectionProps = {
  contents: TYChannelsData[];
};

export default function ChannelSection({ contents }: ChannelSectionProps) {
  const session = useSession().data;
  const { whiteList } = useCachedData({ session });

  return (
    <section className={css.channelSection}>
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
