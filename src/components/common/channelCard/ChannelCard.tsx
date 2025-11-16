'use client';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { isDesktop } from 'react-device-detect';
import { toast } from 'sonner';
import { DEFAULT_BLUR_BASE64 } from '@/constants';
import useMutateWhitelist from '@/hooks/use-delete-whitelist';
import usePostWhitelist from '@/hooks/use-post-whitelist';
import { useTranslations } from '@/libraries/i18n/client';
import { useSetModalStore } from '@/stores/modal';
import { TYChannelsData } from '@/types/api/youtube';
import { gtagClick, gtagClickAtag } from '@/utils/gtag';
import { renderSubscribe } from '@/utils/renderSubscribe';
import { openWindow } from '@/utils/window-event';
import css from './ChannelCard.module.scss';

type ChannelItemProps = {
  content: TYChannelsData;
  session: TSession | null;
  isFavorite: boolean;
  selecteChannel: (content: TYChannelsData) => void;
};

export default function ChannelCard({
  content,
  session,
  isFavorite,
  selecteChannel,
}: ChannelItemProps) {
  const { nameKor: channelName, snippet, url, statistics, uid } = content;
  const { t } = useTranslations();
  const title = snippet?.title ?? '';
  const imageURL = snippet?.thumbnails?.default?.url ?? '/assets/loading.png';
  const description = snippet?.description ?? t('channel.channelCard.hidden');
  const subscribe = renderSubscribe(statistics?.subscriberCount ?? t('channel.channelCard.hidden'));
  const videoCount = statistics?.videoCount ?? t('channel.channelCard.hidden');

  const modalStore = useSetModalStore();

  const mutatePostFavorite = usePostWhitelist();
  const mutateDeleteFavorite = useMutateWhitelist();

  const linkClickEvent = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    if (isDesktop) {
      e.preventDefault();
      return openWindow(url);
    } else {
      return gtagClickAtag(e, {
        target: 'channelCard',
        content: channelName,
        detail: title,
        action: 'atag',
      });
    }
  };

  const openModal = () => {
    gtagClick({
      target: 'channelCard',
      content: channelName,
      detail: title,
      action: 'openModal',
    });

    selecteChannel(content);
  };

  const handleFavorite = () => {
    const email = session?.email;

    if (!email) {
      toast.error(t('channel.channelCard.notLoggedInError'));
      return;
    }

    if (!isFavorite && confirm(t('channel.channelCard.addFavoriteChannel'))) {
      mutatePostFavorite.mutate({ channelId: uid, email });
    } else if (isFavorite && confirm(t('channel.channelCard.removeFavoriteChannel'))) {
      mutateDeleteFavorite.mutate({ channelId: uid, email });
    }
  };

  return (
    <div className={css.channelCard}>
      <a href={url} onClick={linkClickEvent}>
        <div className={css.imageContainer}>
          <Image
            src={imageURL}
            alt=""
            loading="lazy"
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_BASE64}
            fill
            unoptimized
          />
        </div>
      </a>
      <div className={css.desc}>
        <div className={css.titleBox}>
          <button
            onClick={handleFavorite}
            disabled={mutatePostFavorite.isPending || mutateDeleteFavorite.isPending}
          >
            <Star
              size="1.2rem"
              color={isFavorite ? '#ffbb00' : '#a7a7a7'}
              fill={isFavorite ? '#ffbb00' : '#a7a7a7'}
            />
          </button>
          <h3>{channelName}</h3>
        </div>
        <div className={css.details}>
          <div className={css.channelInfo}>
            <p>
              <span className={css.descContentLabel}>{t('channel.channelCard.subscriber')}</span>{' '}
              {subscribe}
            </p>
            <p>
              <span className={css.descContentLabel}>{t('channel.channelCard.video')}</span>{' '}
              {videoCount}
            </p>
          </div>
          <div className={css.link}>
            <button onClick={openModal}>+ {t('channel.channelCard.details')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
