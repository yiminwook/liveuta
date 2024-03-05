'use client';
import { generateFcmToken } from '@/model/firebase/generateFcmToken';
import CopyButton from '../button/CopyButton';
import CardStatus from '../scheduleCard/CardStatus';
import { ContentsDataType } from '@/type/api/mongoDB';
import { gtagClick } from '@inner/_lib/gtag';
import { openWindow } from '@inner/_lib/windowEvent';
import cx from 'classnames';
import { MouseEvent } from 'react';
import { HiBellAlert } from 'react-icons/hi2';
import * as styles from './card.css';
import reservePush from '@inner/_lib/reservePush';
import { useMutation } from '@tanstack/react-query';
import { generateVideoUrl } from '@/model/youtube/url';
import { generateThumbnail } from '@/model/youtube/thumbnail';
import { toast } from 'sonner';

interface CardDescProps {
  content: ContentsDataType;
  addStreamModifier: string;
}

export default function CardDesc({ content, addStreamModifier }: CardDescProps) {
  const { title, channelName, korTime, interval, isStream, timestamp, videoId } = content;

  const videoUrl = generateVideoUrl(videoId);
  const thumbnailUrl = generateThumbnail(videoId, 'mqdefault');

  const mutatePush = useMutation({
    mutationKey: ['push', videoId],
    mutationFn: reservePush,
    onSuccess: (response) => {
      gtagClick({
        target: 'sheduleAlarm',
        content: content.channelName,
        detail: content.title,
        action: 'alamReserve',
      });

      toast.success(response.data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleReserve = async (e: MouseEvent<HTMLButtonElement>) => {
    if (mutatePush.isPending || isStream !== 'NULL') return;

    const token = await generateFcmToken();

    if (token === undefined) {
      throw new Error('토큰을 가져오는데 실패했습니다.');
    }

    mutatePush.mutate({
      title: '스케쥴 알림',
      body: `곧 ${channelName}의 방송이 시작됩니다.`,
      token,
      timestamp: timestamp.toString(),
      imageUrl: thumbnailUrl,
      link: videoUrl,
    });
  };

  const openStream = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    gtagClick({
      target: 'scheduleCard',
      content: content.channelName,
      detail: content.title,
      action: 'openWindow',
    });

    openWindow(videoUrl);
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
          <button className={'alaram'} onClick={handleReserve} disabled={mutatePush.isPending}>
            <HiBellAlert color="inherit" size="1.25rem" />
          </button>
        ) : null}
        <CopyButton value={videoUrl} size="1rem" />
        <button onClick={openStream}>새 탭으로 열기</button>
      </div>
    </div>
  );
}
