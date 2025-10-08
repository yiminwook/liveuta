import Image from 'next/image';
import { MouseEvent } from 'react';
import CopyButton from '@/components/common/button/CopyButton';
import { DEFAULT_BLUR_BASE64 } from '@/constants';
import { useTranslations } from '@/libraries/i18n/client';
import { TYChannelsData } from '@/types/api/youtube';
import { gtagClick, gtagClickAtag } from '@/utils/gtag';
import { renderSubscribe } from '@/utils/renderSubscribe';
import { openWindow } from '@/utils/window-event';
import css from './ChannelCardModal.module.scss';
import Modal from './Modal';

type ChannelCardModalProp = {
  content: TYChannelsData;
  onClose: () => void;
};

const CHANNEL_MODAL_ID = 'channelCardModal';

export default function ChannelCardModal({ content, onClose }: ChannelCardModalProp) {
  const { nameKor: channelName, snippet, url, statistics, uid } = content;
  const { t } = useTranslations();

  const videoCount = statistics?.videoCount ?? t('channel.channelCard.hidden');
  const subscribe = renderSubscribe(statistics?.subscriberCount ?? t('channel.channelCard.hidden'));
  const title = snippet?.title ?? '';
  const imageURL = snippet?.thumbnails?.default?.url ?? '/assets/loading.png';
  const description = snippet?.description ?? t('channel.channelCard.hidden');

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
                alt={`${channelName}${t('global.modal.channelCardModal.channelImageOf')}`}
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
                {t('global.modal.channelCardModal.subscribers')} {subscribe}
              </h4>
              <h4 className={css.h4}>
                {t('global.modal.channelCardModal.videos')} {videoCount}
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
                {t('global.modal.channelCardModal.channel')}
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
