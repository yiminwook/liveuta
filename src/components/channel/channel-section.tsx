'use client';
import variable from '@variable';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import ChannelCard from '@/components/common/channelCard/ChannelCard';
import Nodata from '@/components/common/Nodata';
import useCachedData from '@/hooks/use-cached-data';
import { Link } from '@/libraries/i18n';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { useSession } from '@/stores/session';
import { TYChannelsData } from '@/types/api/youtube';
import ChannelCardModal from '../common/modal/ChannelCardModal';
import Portal from '../config/portal';
import css from './Home.module.scss';

type ChannelSectionProps = {
  contents: TYChannelsData[];
};

export default function ChannelSection({ contents }: ChannelSectionProps) {
  const locale = useLocale();
  const { t } = useTranslations();
  const session = useSession((state) => state.session);

  const { whiteListMap } = useCachedData({ session });
  const [selectedChannel, setSelectedChannel] = useState<TYChannelsData | null>(null);

  const selecteChannel = (content: TYChannelsData) => setSelectedChannel(() => content);
  const unSelecteChannel = () => setSelectedChannel(() => null);

  if (contents.length === 0) {
    return (
      <div style={{ marginBlock: '5rem' }}>
        <Nodata />
        <div style={{ textAlign: 'center' }}>
          <Link
            locale={locale}
            href="/request"
            style={{
              color: variable.thirdColorDefault,
            }}
          >
            {t('channel.3000')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className={css.channelSection}>
        {contents.map((content) => (
          <ChannelCard
            key={content.uid}
            content={content}
            session={session}
            isFavorite={whiteListMap.has(content.uid)}
            selecteChannel={selecteChannel}
          />
        ))}
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
