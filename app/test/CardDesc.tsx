'use client';
import scheduleCard from '@/components/common/scheduleCard/ScheduleCard.module.scss';
import { openWindow } from '@/utils/windowEvent';
import CopyButton from '@/components/common/button/CopyButton';
import { ContentsDataType } from '@/types/inSheet';
import { combineClassName } from '@/utils/combineClassName';
import { MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { HiBellAlert } from 'react-icons/hi2';
import ScheduleStatus from '@/components/common/scheduleCard/ScheduleStatus';
import useMutatePush from '@/queries/push';
import { generateFcmToken } from '@/models/firebase/generateFcmToken';
import { gtagClick } from '@/utils/gtag';
import styled from '@emotion/styled';

const DescBox = styled.div`
  margin-bottom: 0.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;

  .channel_name {
    font-weight: 500;

    &.stream {
      font-weight: 600;
      color: map-get($colors, highlight-font);
    }
  }

  .title {
    flex: 1;
    font-size: 0.7rem;
    color: map-get($colors, font);
    @include text-line(2, 1.1rem);

    &.stream {
      font-weight: 500;
      color: map-get($colors, secondary);
    }
  }

  .time {
    display: flex;
    font-size: 0.6rem;
    margin-bottom: 0.2rem;
    align-items: center;
    gap: 0.5rem;

    .status {
      display: flex;
      align-items: center;
      font-weight: 500;
      gap: 0.125rem;
      color: map-get($colors, highlight-font);
      vertical-align: middle;
    }
  }
`;

const TextTwoLine = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

interface ScheduleCardDescProps {
  content: ContentsDataType;
  addStreamModifier: string;
}

const ScheduleCardDesc = ({ content, addStreamModifier }: ScheduleCardDescProps) => {
  const { title, url, channelName, korTime, interval, isStream, timestamp, thumbnailURL, videoId } = content;
  const { pushMutateAsync, isPendingPush } = useMutatePush({ key: videoId });

  const handleReserve = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      if (isPendingPush || isStream !== 'NULL') return;
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
        toast.warning('이미 예약된 알림입니다.');
        return;
      }

      gtagClick({
        target: 'sheduleAlarm',
        content: content.channelName,
        detail: content.title,
        action: 'alamReserve',
      });

      toast.success('알림이 예약되었습니다.');
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Unknown Error';
      toast.error(message);
    }
  };

  return (
    <DescBox>
      <div className={combineClassName(scheduleCard['channel_name'], addStreamModifier)}>{channelName}</div>
      <TextTwoLine className={combineClassName(scheduleCard['title'], addStreamModifier)}>{title}</TextTwoLine>
      <div className={scheduleCard['time']}>
        <time className={scheduleCard['kor']}>{korTime}</time>
        <ScheduleStatus isStream={isStream} interval={interval} videoId={videoId} />
      </div>
      <div className={scheduleCard['link']}>
        {isStream === 'NULL' ? (
          <button className={scheduleCard['alaram']} onClick={handleReserve} disabled={isPendingPush}>
            <HiBellAlert color="inherit" size="0.75rem" />
          </button>
        ) : null}
        <CopyButton value={url} size="0.75rem" />
        <button
          onClick={(e) => {
            e.preventDefault();

            gtagClick({
              target: 'scheduleCard',
              content: content.channelName,
              detail: content.title,
              action: 'openWindow',
            });

            openWindow(url);
          }}
        >
          새 탭으로 열기
        </button>
      </div>
    </DescBox>
  );
};

export default ScheduleCardDesc;
