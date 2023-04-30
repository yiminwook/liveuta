import Image from 'next/image';
import Modal from '@/components/layout/Modal';
import channelCardModal from '@/styles/common/ChannelCardModal.module.scss';
import { openWindow } from '@/utils/windowEvent';
import CopyButton from '@/components/common/CopyButton';
import { MouseEvent } from 'react';
import Link from 'next/link';
import { DEFAULT_BLUR_BASE64 } from '@/consts';

interface ChannelCardModalProp {
  onClose: (e: MouseEvent) => void;
  channelName: string;
  title: string;
  imageURL: string;
  url: string;
  videoCount: string;
  subscribe: string;
  description: string;
}

const ChannelCardModal = ({
  title,
  channelName,
  imageURL,
  url,
  videoCount,
  subscribe,
  description,
  onClose,
}: ChannelCardModalProp) => {
  return (
    <Modal onClose={onClose}>
      <div className={channelCardModal['modal']}>
        <div className={channelCardModal['profile']}>
          <Link href={url}>
            <div className={channelCardModal['image-container']}>
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
          <div className={channelCardModal['info']}>
            <h1 className={channelCardModal['channel-name']}>{channelName}</h1>
            <h2 className={channelCardModal['title']}>{title}</h2>
            <div className={channelCardModal['detail']}>
              <h3 className={channelCardModal['subscribe']}>구독자 {subscribe}</h3>
              <h3 className={channelCardModal['video-count']}>업로드 수 {videoCount} 개</h3>
            </div>
            <div className={channelCardModal['link']}>
              <button onClick={() => openWindow(url)}>유투브 채널</button>
              <CopyButton value={url} size={'1rem'} />
            </div>
          </div>
        </div>
        <hr />
        <pre className={channelCardModal['desc']}>{description}</pre>
      </div>
    </Modal>
  );
};

export default ChannelCardModal;
