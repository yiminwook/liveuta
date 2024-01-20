import CopyButton from '@/components/common/button/CopyButton';
import CardStatus from '@/components/common/scheduleCard/CardStatus';
import { DescBox } from '@/components/common/scheduleCard/Style';
import { generateFcmToken } from '@/models/firebase/generateFcmToken';
import useMutatePush from '@/queries/push';
import { ContentsDataType } from '@/types/inSheet';
import { cx } from '@/utils';
import { gtagClick } from '@/utils/gtag';
import { openWindow } from '@/utils/windowEvent';
import { MouseEvent } from 'react';
import { HiBellAlert } from 'react-icons/hi2';
import { toast } from 'react-toastify';

interface CardDescProps {
  content: ContentsDataType;
  addStreamModifier: string;
}

const CardDesc = ({ content, addStreamModifier }: CardDescProps) => {
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
    <DescBox>
      <div className={cx('channelName', addStreamModifier)}>{channelName}</div>
      <p className={cx('title', addStreamModifier)}>{title}</p>
      <div className={'time'}>
        <time className={'kor'}>{korTime}</time>
        <CardStatus isStream={isStream} interval={interval} videoId={videoId} />
      </div>
      <div className={'link'}>
        {isStream === 'NULL' ? (
          <button className={'alaram'} onClick={handleReserve} disabled={isPendingPush}>
            <HiBellAlert color="inherit" size="0.75rem" />
          </button>
        ) : null}
        <CopyButton value={url} size="0.75rem" />
        <button onClick={openStream}>새 탭으로 열기</button>
      </div>
    </DescBox>
  );
};

export default CardDesc;
