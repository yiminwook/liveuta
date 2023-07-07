'use client';
import { ChannelsDataType } from '@/types/inYoutube';
import Image from 'next/image';
import channelCard from '@/components/common/channelCard/ChannelCard.module.scss';
import { renderSubscribe } from '@/utils/renderSubscribe';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import ChannelCardModal from '@/components/common/channelCard/ChannelCardModal';
import { openWindow } from '@/utils/windowEvent';
import CopyButton from '@/components/common/CopyButton';
import useStopPropagation from '@/hooks/useStopPropagation';
import { DEFAULT_BLUR_BASE64 } from '@/consts';

interface ChannelItemProps {
  content: ChannelsDataType;
}

const ChannelItem = ({ content }: ChannelItemProps) => {
  const [showModal, setShowModal] = useState(false);
  const { stopPropagation } = useStopPropagation();
  const { channelName, snippet, url, statistics } = content;
  const title = snippet.title ?? '';
  const imageURL = snippet.thumbnails?.default?.url ?? '/loading.png';
  const description = snippet.description ?? '비공개';
  const subscribe = renderSubscribe(statistics.subscriberCount ?? '비공개');
  const videoCount = statistics.videoCount ?? '비공개';

  const toggleModal = (e: MouseEvent) => {
    e.stopPropagation();
    setShowModal((pre) => !pre);
  };

  const handleOpenWindow = (e: MouseEvent) => {
    e.stopPropagation();
    openWindow(url);
  };

  return (
    <>
      <div className={channelCard['channel']} onClick={toggleModal}>
        <Link href={url} onClick={stopPropagation}>
          <div className={channelCard['image-container']}>
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
        </Link>
        <div className={channelCard['desc']}>
          <h1>{channelName}</h1>
          <div className={channelCard['details']}>
            <h2>{title}</h2>
            <p className={channelCard['subscribe']}>구독자 {subscribe}</p>
            <p className={channelCard['upload-count']}>업로드 수: {videoCount}</p>
            <div className={channelCard['link']}>
              <button onClick={handleOpenWindow}>유투브 채널</button>
              <CopyButton value={url} size={'0.8rem'} />
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <ChannelCardModal
          channelName={channelName}
          title={title}
          imageURL={imageURL}
          url={url}
          videoCount={videoCount}
          subscribe={subscribe}
          description={description}
          onClose={toggleModal}
        />
      ) : null}
    </>
  );
};

export default ChannelItem;
