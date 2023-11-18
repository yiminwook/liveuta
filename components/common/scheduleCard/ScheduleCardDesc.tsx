import scheduleCard from '@/components/common/scheduleCard/ScheduleCard.module.scss';
import { openWindow } from '@/utils/windowEvent';
import CopyButton from '@/components/common/button/CopyButton';
import { ContentsDataType } from '@/types/inSheet';
import { combineClassName } from '@/utils/combineClassName';
import { generateFcmToken } from '@/models/firebase/generateFcmToken';
import { MouseEvent, useEffect, useReducer, useState } from 'react';
import { TokenRequestBody } from '@/app/api/push/reserve/route';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiBellAlert } from 'react-icons/hi2';

interface ScheduleCardDescProps {
  content: ContentsDataType;
  addStreamModifier: string;
}

const ScheduleCardDesc = ({ content, addStreamModifier }: ScheduleCardDescProps) => {
  const { title, url, channelName, korTime, interval, isStream, timestamp, thumbnailURL, videoId } = content;
  const [isLoading, setIsLoading] = useState(false);
  const [viewCount, setViewCount] = useState('-');

  const reservePush = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      if (isLoading || isStream !== 'NULL') return;

      const token = await generateFcmToken();

      if (token === undefined) {
        throw new Error('토큰을 가져오는데 실패했습니다.');
      }

      const data: TokenRequestBody = {
        title: '스케쥴 알림',
        body: `곧 ${channelName}의 방송이 시작됩니다.`,
        token,
        timestamp: timestamp,
        imageUrl: thumbnailURL,
      };

      setIsLoading(() => true);

      await axios({
        method: 'POST',
        url: '/api/push/reserve',
        data,
      });

      toast.success('서버가 없어서 예약안됌.. ㅠㅠ');
    } catch (error) {
      const message = e instanceof Error ? e.message : 'Unknown Error';
      console.error(e);
      toast.error(message);
    } finally {
      setIsLoading(() => false);
    }
  };

  const getViewCount = async () => {
    try {
      if (isStream !== 'TRUE') return;
      const res = await axios.get(`/api/crawler?id=${videoId}`);
      const data = res.data.data;
      setViewCount(() => data);
    } catch (error) {}
  };

  useEffect(() => {
    getViewCount();
  }, []);

  return (
    <div className={scheduleCard['description']}>
      <div className={combineClassName(scheduleCard['channel_name'], addStreamModifier)}>{channelName}</div>
      <div className={combineClassName(scheduleCard['title'], addStreamModifier)}>{title}</div>
      <div className={scheduleCard['time']}>
        <time className={scheduleCard['kor']}>{korTime}</time>
        <div className={scheduleCard['status']}>{isStream === 'TRUE' ? `LIVE! (${viewCount})` : interval}</div>
      </div>
      <div className={scheduleCard['link']}>
        {isStream === 'NULL' ? (
          <button className={scheduleCard['alaram']} onClick={reservePush} disabled={isLoading}>
            <HiBellAlert color="inherit" size="0.8rem" />
          </button>
        ) : null}
        <CopyButton value={url} size="0.8rem" />
        <button onClick={() => openWindow(url)}>새 탭으로 열기</button>
      </div>
    </div>
  );
};

export default ScheduleCardDesc;
