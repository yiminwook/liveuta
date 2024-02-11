'use client';
import useToast from '@/hook/useToast';
import { generateFcmToken } from '@/model/firebase/generateFcmToken';
import useMutatePush from '@/app/(inner)/_lib/reservePush';
import CopyButton from '../button/CopyButton';
import CardStatus from '../scheduleCard/CardStatus';
//import { ContentsDataType } from '@/types/inSheet';
import { ContentsDataType } from '@/type/api/mongoDB';
import { gtagClick } from '@inner/_lib/gtag';
import { openWindow } from '@inner/_lib/windowEvent';
import cx from 'classnames';
import { MouseEvent } from 'react';
import { HiBellAlert } from 'react-icons/hi2';
import * as styles from './card.css';

interface CardDescProps {
  content: ContentsDataType;
  addStreamModifier: string;
}

export default function CardDesc({ content, addStreamModifier }: CardDescProps) {
  const { title, url, channelName, korTime, interval, isStream, timestamp, thumbnailURL, videoId } =
    content;
  const toast = useToast();
  const { pushMutateAsync, isPendingPush } = useMutatePush({ key: videoId });

  const handleReserve = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      if (isPendingPush || isStream !== 'NULL') return;
      const result = window.confirm('예약후에는 취소할 수 없습니다.');
      if (result === false) return;
      const token = await generateFcmToken();

      if (token === undefined) {
        throw new Error('토큰을 가져오는데 실패했습니다.');
      }

      const response = await pushMutateAsync({
        title: '스케쥴 알림',
        body: `곧 ${channelName}의 방송이 시작됩니다.`,
        token,
        timestamp: timestamp.toString(),
        imageUrl: thumbnailURL || 'https://liveuta.vercel.app/assets/meta-image.png',
        link: url,
      });

      if (response.status === 226) {
        toast.warning({ text: '이미 예약된 알림입니다.' });
        return;
      }

      gtagClick({
        target: 'sheduleAlarm',
        content: content.channelName,
        detail: content.title,
        action: 'alamReserve',
      });

      toast.success({ text: '알림이 예약되었습니다.' });
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Unknown Error';
      toast.error({ text: message });
    }
  };

  const openStream = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    gtagClick({
      target: 'scheduleCard',
      content: content.channelName,
      detail: content.title,
      action: 'openWindow',
    });
    openWindow(url);
  };

  return (
    <div className={styles.descBox}>
      <div className={cx(styles.channelName, addStreamModifier)}>{channelName}</div>
      <p className={cx(styles.title, addStreamModifier)}>{title}</p>
      <div className={styles.time}>
        <time className={'kor'}>{korTime}</time>
        <CardStatus isStream={isStream} interval={interval} videoId={videoId} />
      </div>
      <div className={styles.link}>
        {isStream === 'NULL' ? (
          <button className={'alaram'} onClick={handleReserve} disabled={isPendingPush}>
            <HiBellAlert color="inherit" size="1.25rem" />
          </button>
        ) : null}
        <CopyButton value={url} size="1rem" />
        <button onClick={openStream}>새 탭으로 열기</button>
      </div>
    </div>
  );
}
