'use client';
import { generateFcmToken } from '@/model/firebase/generateFcmToken';
import { generateThumbnail } from '@/model/youtube/thumbnail';
import { generateVideoUrl } from '@/model/youtube/url';
import { ContentsDataType } from '@/type/api/mongoDB';
import { gtagClick } from '@inner/_lib/gtag';
import reservePush from '@inner/_lib/reservePush';
import { openWindow } from '@inner/_lib/windowEvent';
import { useMutation } from '@tanstack/react-query';
import cx from 'classnames';
import { MouseEvent } from 'react';
import { HiBellAlert } from 'react-icons/hi2';
import { toast } from 'sonner';
import CopyButton from '../button/CopyButton';
import CardStatus from '../scheduleCard/CardStatus';
import * as styles from './card.css';
import * as action from '../../_action/blacklist';
import { Session } from 'next-auth';

interface CardDescProps {
  content: ContentsDataType;
  addStreamModifier: string;
  session: Session | null;
}

export default function CardDesc({ session, content, addStreamModifier }: CardDescProps) {
  const { title, channelName, korTime, interval, isStream, timestamp, videoId, viewer } = content;

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

  const mutateBlock = useMutation({
    mutationKey: ['block', videoId],
    mutationFn: action.POST,
    onSuccess: (response) => {},
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

  const handleBlock = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!session) return toast.error('로그인 후 이용가능한 서비스입니다.');

    mutateBlock.mutate({
      accessToken: session.user.accessToken,
      channelId: 'UCWCc8tO-uUl_7SJXIKJACMw',
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
        <CardStatus isStream={isStream} interval={interval} viewer={viewer} />
      </div>
      <div className={styles.link}>
        {isStream === 'NULL' ? (
          <button className={'alaram'} onClick={handleReserve} disabled={mutatePush.isPending}>
            <HiBellAlert color="inherit" size="1.25rem" />
          </button>
        ) : null}
        <button onClick={handleBlock}>블럭</button>
        <CopyButton value={videoUrl} size="1rem" />
        <button onClick={openStream}>새 탭으로 열기</button>
      </div>
    </div>
  );
}
