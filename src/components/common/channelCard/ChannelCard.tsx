'use client';
import ChannelCardModal from '@/components/common/modal/ChannelCardModal';
import { DEFAULT_BLUR_BASE64 } from '@/constants';
import useMutateWhitelist from '@/hooks/use-delete-whitelist';
import usePostWhitelist from '@/hooks/use-post-whitelist';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { useSetModalStore } from '@/stores/modal';
import { TYChannelsData } from '@/types/api/youtube';
import { gtagClick, gtagClickAtag } from '@/utils/gtag';
import { renderSubscribe } from '@/utils/renderSubscribe';
import { openWindow } from '@/utils/window-event';
import { IconStarFilled } from '@tabler/icons-react';
import { Session } from 'next-auth';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { isDesktop } from 'react-device-detect';
import { toast } from 'sonner';
import css from './ChannelCard.module.scss';

type ChannelItemProps = {
  content: TYChannelsData;
  session: Session | null;
  isFavorite: boolean;
};

export default function ChannelItem({ content, session, isFavorite }: ChannelItemProps) {
  const { nameKor: channelName, snippet, url, statistics, uid } = content;
  const locale = useLocale();
  const { t } = useTranslations();
  const router = useRouter();
  const title = snippet?.title ?? '';
  const imageURL = snippet?.thumbnails?.default?.url ?? '/loading.png';
  const description = snippet?.description ?? t('channel.channelCard.hidden');
  const subscribe = renderSubscribe(statistics?.subscriberCount ?? t('channel.channelCard.hidden'));
  const videoCount = statistics?.videoCount ?? t('channel.channelCard.hidden');

  const modalStore = useSetModalStore();

  const mutatePostFavorite = usePostWhitelist();
  const mutateDeleteFavorite = useMutateWhitelist();

  const onCardClick = () => {
    router.push(`channel/${uid}`);
  };

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

  const openModal = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    gtagClick({
      target: 'channelCard',
      content: channelName,
      detail: title,
      action: 'openModal',
    });

    await modalStore.push(ChannelCardModal, {
      props: {
        channelName,
        title,
        imageURL,
        url,
        videoCount,
        subscribe,
        description,
        locale,
      },
    });
  };

  const handleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!session) {
      toast.error(t('channel.channelCard.notLoggedInError'));
      return;
    }

    if (!isFavorite && confirm(t('channel.channelCard.addFavoriteChannel'))) {
      mutatePostFavorite.mutate({
        session,
        channelId: uid,
      });
    } else if (isFavorite && confirm(t('channel.channelCard.removeFavoriteChannel'))) {
      mutateDeleteFavorite.mutate({
        session,
        channelId: uid,
      });
    }
  };

  return (
    <div className={css.channelCard} onClick={onCardClick}>
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
            <IconStarFilled size="1.2rem" color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
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
