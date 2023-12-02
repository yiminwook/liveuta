'use client';
import scheduleCard from '@/components/common/scheduleCard/ScheduleCard.module.scss';
import { openWindow } from '@/utils/windowEvent';
import CopyButton from '@/components/common/button/CopyButton';
import { ContentsDataType } from '@/types/inSheet';
import { combineClassName } from '@/utils/combineClassName';
import { generateFcmToken } from '@/models/firebase/generateFcmToken';
import { MouseEvent, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiBellAlert } from 'react-icons/hi2';
import ScheduleStatus from '@/components/common/scheduleCard/ScheduleStatus';
import { PushData } from '@/app/api/push/route';

interface ScheduleCardDescProps {
  content: ContentsDataType;
  addStreamModifier: string;
}

const ScheduleCardDesc = ({ content, addStreamModifier }: ScheduleCardDescProps) => {
  const { title, url, channelName, korTime, interval, isStream, timestamp, thumbnailURL, videoId } = content;
  const [isLoading, setIsLoading] = useState(false);

  const reservePush = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      if (isLoading || isStream !== 'NULL') return;

      const token = await generateFcmToken();

      if (token === undefined) {
        throw new Error('토큰을 가져오는데 실패했습니다.');
      }

      const data: PushData = {
        title: '스케쥴 알림',
        body: `곧 ${channelName}의 방송이 시작됩니다.`,
        token,
        timestamp: timestamp.toString(),
        imageUrl: thumbnailURL || 'https://liveuta.vercel.app/assets/meta-image.png',
        link: process.env.NEXT_PUBLIC_URL + '/redirect/youtube/' + videoId,
      };

      setIsLoading(() => true);

      const sheetData = await axios<{ message: string }>({
        method: 'POST',
        url: '/api/sheet',
        data,
      });

      if (sheetData.status === 226) {
        toast.warning('이미 예약된 알림입니다.');
        return;
      }

      toast.success('알림이 예약되었습니다.');
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Unknown Error';
      toast.error(message);
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <div className={scheduleCard['description']}>
      <div className={combineClassName(scheduleCard['channel_name'], addStreamModifier)}>{channelName}</div>
      <div className={combineClassName(scheduleCard['title'], addStreamModifier)}>{title}</div>
      <div className={scheduleCard['time']}>
        <time className={scheduleCard['kor']}>{korTime}</time>
        <ScheduleStatus isStream={isStream} interval={interval} videoId={videoId} />
      </div>
      <div className={scheduleCard['link']}>
        {isStream === 'NULL' ? (
          <button className={scheduleCard['alaram']} onClick={reservePush} disabled={isLoading}>
            <HiBellAlert color="inherit" size="0.75rem" />
          </button>
        ) : null}
        <CopyButton value={url} size="0.75rem" />
        <button onClick={() => openWindow(url)}>새 탭으로 열기</button>
      </div>
    </div>
  );
};

export default ScheduleCardDesc;
