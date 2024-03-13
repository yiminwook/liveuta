import Image from 'next/image';
import Modal from '@inner/_component/modal/Modal';
import channelCardModal from './channelCardModal.module.scss';
import { openWindow } from '@inner/_lib/windowEvent';
import CopyButton from '@inner/_component/button/CopyButton';
import { DEFAULT_BLUR_BASE64 } from '@/const';
import { MouseEvent } from 'react';
import { gtagClick, gtagClickAtag } from '@inner/_lib/gtag';
import portal from '@/model/portal';

interface ChannelCardModalProp {
  onClose: () => void;
  channelName: string;
  title: string;
  imageURL: string;
  url: string;
  videoCount: string;
  subscribe: string;
  description: string;
}

export default portal(
  'channelCardModal',
  function ChannelCardModal({
    title,
    channelName,
    imageURL,
    url,
    videoCount,
    subscribe,
    description,
    onClose,
  }: ChannelCardModalProp) {
    const linkClickEvent = (e: MouseEvent<HTMLAnchorElement>) =>
      gtagClickAtag(e, {
        target: 'channelCardModal',
        content: channelName,
        detail: title,
        action: 'atag',
      });

    return (
      <Modal onClose={onClose}>
        <div className={channelCardModal['modal']}>
          <div className={channelCardModal['profile']}>
            <a href={url} onClick={linkClickEvent}>
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
            </a>
            <div className={channelCardModal['info']}>
              <h1 className={channelCardModal['channel-name']}>{channelName}</h1>
              <h2 className={channelCardModal['title']}>{title}</h2>
              <div className={channelCardModal['detail']}>
                <h3 className={channelCardModal['subscribe']}>구독자 {subscribe}</h3>
                <h3 className={channelCardModal['video-count']}>업로드 수 {videoCount} 개</h3>
              </div>
              <div className={channelCardModal['link']}>
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    gtagClick({
                      target: 'channleCardModal',
                      content: channelName,
                      detail: title,
                      action: 'openWindow',
                    });

                    openWindow(url);
                  }}
                >
                  유투브 채널
                </button>
                <CopyButton value={url} size={'1rem'} />
              </div>
            </div>
          </div>
          <hr />
          <pre className={channelCardModal['desc']}>{description}</pre>
        </div>
      </Modal>
    );
  },
);
