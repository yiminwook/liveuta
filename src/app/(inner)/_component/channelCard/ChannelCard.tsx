'use client';
import { DEFAULT_BLUR_BASE64 } from '@/const';
import { ChannelsDataType } from '@/type/api/youtube';
import CopyButton from '@inner/_component/button/CopyButton';
import { gtagClick, gtagClickAtag } from '@inner/_lib/gtag';
import { renderSubscribe } from '@inner/_lib/renderSubscribe';
import { openWindow } from '@inner/_lib/windowEvent';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import ChannelCardModal from '../modal/ChannelCardModal';
import channelCard from './channelCard.module.scss';

import * as styles from './channelCard.css';

interface ChannelItemProps {
  content: ChannelsDataType;
}

export default function ChannelItem({ content }: ChannelItemProps) {
  const [showModal, setShowModal] = useState(false);
  const { channelName, snippet, url, statistics } = content;
  const title = snippet.title ?? '';
  const imageURL = snippet.thumbnails?.default?.url ?? '/loading.png';
  const description = snippet.description ?? '비공개';
  const subscribe = renderSubscribe(statistics.subscriberCount ?? '비공개');
  const videoCount = statistics.videoCount ?? '비공개';

  const linkClickEvent = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    return gtagClickAtag(e, {
      target: 'channelCard',
      content: channelName,
      detail: title,
      action: 'atag',
    });
  };

  const toggleModal = (e: MouseEvent) => {
    if (showModal === false) {
      gtagClick({
        target: 'channelCard',
        content: channelName,
        detail: title,
        action: 'openModal',
      });
    }

    setShowModal((pre) => !pre);
  };

  const closeModal = () => {
    setShowModal(() => false);
  };

  const handleOpenWindow = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openWindow(url);
  };

  return (
    <>
      <div className={styles.channelCard} onClick={toggleModal}>
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
          <h1 className={styles.title}>{channelName}</h1>
          <div className={styles.details}>
            {/* <h2 className={styles.originalTitle}>{title}</h2> */}
            <p className={styles.descContent}>
              <span className={styles.descContentLabel}>구독자</span> {subscribe}
            </p>
            <p className={styles.descContent}>
              <span className={styles.descContentLabel}>동영상</span> {videoCount}
            </p>
            <div className={styles.link}>
              <button onClick={handleOpenWindow}>유투브 채널</button>
              <CopyButton value={url} size={'0.8rem'} />
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ChannelCardModal
          channelName={channelName}
          title={title}
          imageURL={imageURL}
          url={url}
          videoCount={videoCount}
          subscribe={subscribe}
          description={description}
          onClose={closeModal}
        />
      )}
    </>
  );
}
