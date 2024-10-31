'use client';
import { DEFAULT_BLUR_BASE64 } from '@/constants';
import useMutateWhitelist from '@/hooks/useDeleteWhitelist';
import useModalStore from '@/hooks/useModalStore';
import usePostWhitelist from '@/hooks/usePostWhitelist';
import { ChannelsDataType } from '@/types/api/youtube';
import { Session } from '@auth/core/types';
import { whitelistAtom } from '@/stores/schedule';
import { gtagClick, gtagClickAtag } from '@/utils/gtag';
import { renderSubscribe } from '@/utils/renderSubscribe';
import { openWindow } from '@/utils/windowEvent';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { isDesktop } from 'react-device-detect';
import { FaStar } from 'react-icons/fa6';
import { toast } from 'sonner';
import ChannelCardModal from '@/components/common/modal/ChannelCardModal';
import * as styles from './channelCard.css';

type ChannelItemProps = {
  content: ChannelsDataType;
  session: Session | null;
};

export default function ChannelItem({ content, session }: ChannelItemProps) {
  const { channelName, snippet, url, statistics, uid } = content;
  const title = snippet.title ?? '';
  const imageURL = snippet.thumbnails?.default?.url ?? '/loading.png';
  const description = snippet.description ?? '비공개';
  const subscribe = renderSubscribe(statistics.subscriberCount ?? '비공개');
  const videoCount = statistics.videoCount ?? '비공개';

  const modalStore = useModalStore();
  const [whitelist] = useAtom(whitelistAtom);

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

  const openModal = async (e: MouseEvent) => {
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

  const handleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    if (!session) return toast.error('로그인 후 이용가능한 서비스입니다.');

    if (!isFavorite && confirm('즐겨찾기에 추가하시겠습니까?')) {
      mutatePostFavorite.mutate({
        session,
        channelId: uid,
      });
    } else if (isFavorite && confirm('즐겨찾기에서 제거하시겠습니까?')) {
      mutateDeleteFavorite.mutate({
        session,
        channelId: uid,
      });
    }
  };

  const isFavorite = whitelist.has(uid);

  return (
    <div className={styles.channelCard}>
      <a className={styles.linkToChannel} href={url} onClick={linkClickEvent}>
        <div className={styles.imageContainer}>
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
      <div className={styles.desc}>
        <div className={styles.title}>
          <h3>{channelName}</h3>
          <button
            onClick={handleFavorite}
            disabled={mutatePostFavorite.isPending || mutateDeleteFavorite.isPending}
          >
            <FaStar size="1.2rem" color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
          </button>
        </div>
        <div className={styles.details}>
          <p className={styles.descContent}>
            <span className={styles.descContentLabel}>구독자</span> {subscribe}
          </p>
          <p className={styles.descContent}>
            <span className={styles.descContentLabel}>동영상</span> {videoCount}
            <span>개</span>
          </p>
          <div className={styles.link}>
            <button onClick={openModal}>+ 상세보기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
