import CopyButton from '@/components/common/button/CopyButton';
import { DEFAULT_BLUR_BASE64 } from '@/constants';
import { ModalProps } from '@/stores/modal';
import { gtagClick, gtagClickAtag } from '@/utils/gtag';
import { openWindow } from '@/utils/windowEvent';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MouseEvent } from 'react';
import css from './ChannelCardModal.module.scss';
import Modal from './Modal';

type ChannelCardModalProp = {
  channelName: string;
  title: string;
  imageURL: string;
  url: string;
  videoCount: string;
  subscribe: string;
  description: string;
};

const CHANNEL_MODAL_ID = 'channelCardModal';

export default function ChannelCardModal({
  title,
  channelName,
  imageURL,
  url,
  videoCount,
  subscribe,
  description,
  onClose,
}: ModalProps<ChannelCardModalProp>) {
  const t = useTranslations('global.modal.channelCardModal');

  const linkClickEvent = (e: MouseEvent<HTMLAnchorElement>) =>
    gtagClickAtag(e, {
      target: CHANNEL_MODAL_ID,
      content: channelName,
      detail: title,
      action: 'atag',
    });

  return (
    <Modal id={CHANNEL_MODAL_ID} onClose={onClose}>
      <div className={css.content}>
        <div className={css.profile}>
          <a href={url} onClick={linkClickEvent}>
            <div className={css.itemContainer}>
              <Image
                src={imageURL}
                alt={`${channelName}${t('channelImageOf')}`}
                loading="lazy"
                placeholder="blur"
                blurDataURL={DEFAULT_BLUR_BASE64}
                fill
                unoptimized
              />
            </div>
          </a>
          <div className={css.info}>
            <h2 className={css.h2}>{channelName}</h2>
            <h3 className={css.h3}>{title}</h3>
            <div className={css.detail}>
              <h4 className={css.h4}>
                {t('subscribers')} {subscribe}
              </h4>
              <h4 className={css.h4}>
                {t('videos')} {videoCount}
              </h4>
            </div>
            <div className={css.link}>
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
                {t('channel')}
              </button>
              <CopyButton value={url} size={'1rem'} />
            </div>
          </div>
        </div>
        <hr className={css.hr} />
        <pre className={css.desc}>{description}</pre>
      </div>
    </Modal>
  );
}
