'use client';
import { DEFAULT_BLUR_BASE64 } from '@/const';
import useModalStore from '@/hook/useModalStore';
import { ChannelsDataType } from '@/type/api/youtube';
import { gtagClick, gtagClickAtag } from '@inner/_lib/gtag';
import { renderSubscribe } from '@inner/_lib/renderSubscribe';
import { openWindow } from '@inner/_lib/windowEvent';
import Image from 'next/image';
import { MouseEvent } from 'react';
import ChannelCardModal from '../modal/ChannelCardModal';
import * as styles from './channelCard.css';
import { isDesktop } from 'react-device-detect';

type ChannelItemProps = {
  content: ChannelsDataType;
};

export default function ChannelItem({ content }: ChannelItemProps) {
  const { channelName, snippet, url, statistics } = content;
  const title = snippet.title ?? '';
  const imageURL = snippet.thumbnails?.default?.url ?? '/loading.png';
  const description = snippet.description ?? '비공개';
  const subscribe = renderSubscribe(statistics.subscriberCount ?? '비공개');
  const videoCount = statistics.videoCount ?? '비공개';

  const modalStore = useModalStore();

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
        <h3 className={styles.title}>{channelName}</h3>
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
