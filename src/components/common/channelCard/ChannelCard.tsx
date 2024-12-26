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
  const title = snippet?.title ?? '';
  const imageURL = snippet?.thumbnails?.default?.url ?? '/loading.png';
  const description = snippet?.description ?? '비공개';
  const subscribe = renderSubscribe(statistics?.subscriberCount ?? '비공개');
  const videoCount = statistics?.videoCount ?? '비공개';

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
            <IconTbStarFilled size="1.2rem" color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
          </button>
          <h3>{channelName}</h3>
        </div>
        <div className={css.details}>
          <div className={css.channelInfo}>
            <p>
              <span className={css.descContentLabel}>구독자</span> {subscribe}
            </p>
            <p>
              <span className={css.descContentLabel}>동영상</span> {videoCount}
              <span>개</span>
            </p>
          </div>
          <div className={css.link}>
            <button onClick={openModal}>+ 상세보기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
