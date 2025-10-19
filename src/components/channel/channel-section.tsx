'use client';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import ChannelCard from '@/components/common/channelCard/ChannelCard';
import Nodata from '@/components/common/Nodata';
import useCachedData from '@/hooks/use-cached-data';
import { useSession } from '@/stores/session';
import { TYChannelsData } from '@/types/api/youtube';
import ChannelCardModal from '../common/modal/ChannelCardModal';
import Portal from '../config/portal';
import css from './Home.module.scss';

type ChannelSectionProps = {
  contents: TYChannelsData[];
};

export default function ChannelSection({ contents }: ChannelSectionProps) {
  const session = useSession();
  const { whiteListMap } = useCachedData({ user: session.user });
  const [selectedChannel, setSelectedChannel] = useState<TYChannelsData | null>(null);

  const selecteChannel = (content: TYChannelsData) => setSelectedChannel(() => content);
  const unSelecteChannel = () => setSelectedChannel(() => null);

  return (
    <>
      <section className={css.channelSection}>
        {contents.map((content) => (
          <ChannelCard
            key={content.uid}
            content={content}
            user={session.user}
            isFavorite={whiteListMap.has(content.uid)}
            selecteChannel={selecteChannel}
          />
        ))}
        {contents.length === 0 && <Nodata />}
      </section>

      <AnimatePresence>
        {!!selectedChannel && (
          <Portal>
            <ChannelCardModal content={selectedChannel} onClose={unSelecteChannel} />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
