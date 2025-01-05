'use client';
import ChannelCardModal from '@/components/common/modal/ChannelCardModal';
import { DEFAULT_BLUR_BASE64 } from '@/constants';
import useMutateWhitelist from '@/hooks/useDeleteWhitelist';
import usePostWhitelist from '@/hooks/usePostWhitelist';
import { useSetModalStore } from '@/stores/modal';
import { TYChannelsData } from '@/types/api/youtube';
import { gtagClick, gtagClickAtag } from '@/utils/gtag';
import { renderSubscribe } from '@/utils/renderSubscribe';
import { openWindow } from '@/utils/windowEvent';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { isDesktop } from 'react-device-detect';
import { toast } from 'sonner';
import FasStar from '~icons/fa-solid/star.jsx';
import css from './ChannelCard.module.scss';

type ChannelItemProps = {
  content: TYChannelsData;
  session: Session | null;
  isFavorite: boolean;
};

export default function ChannelItem({ content, session, isFavorite }: ChannelItemProps) {
  const { nameKor: channelName, snippet, url, statistics, uid } = content;
  const t = useTranslations('channel.channelCard');
  const title = snippet?.title ?? '';
  const imageURL = snippet?.thumbnails?.default?.url ?? '/loading.png';
  const description = snippet?.description ?? t('hidden');
  const subscribe = renderSubscribe(statistics?.subscriberCount ?? t('hidden'));
  const videoCount = statistics?.videoCount ?? t('hidden');

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

  const openModal = async () => {
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
      },
    });
  };

  const handleFavorite = () => {
    if (!session) return toast.error(t('notLoggedInError'));

    if (!isFavorite && confirm(t('addFavoriteChannel'))) {
      mutatePostFavorite.mutate({
        session,
        channelId: uid,
      });
    } else if (isFavorite && confirm(t('removeFavoriteChannel'))) {
      mutateDeleteFavorite.mutate({
        session,
        channelId: uid,
      });
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
            <FasStar width="1.2rem" height="1.2rem" color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
          </button>
          <h3>{channelName}</h3>
        </div>
        <div className={css.details}>
          <div className={css.channelInfo}>
            <p>
              <span className={css.descContentLabel}>{t('subscriber')}</span> {subscribe}
            </p>
            <p>
              <span className={css.descContentLabel}>{t('video')}</span> {videoCount}
            </p>
          </div>
          <div className={css.link}>
            <button onClick={openModal}>+ {t('details')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
