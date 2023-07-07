import scheduleCard from '@/components/common/scheduleCard/ScheduleCard.module.scss';
import { openWindow } from '@/utils/windowEvent';
import CopyButton from '@/components/common/CopyButton';
import { ContentsDataType } from '@/types/inSheet';

interface ScheduleCardDescProps {
  content: ContentsDataType;
  addStreamModifier: string;
}

const ScheduleCardDesc = ({ content, addStreamModifier }: ScheduleCardDescProps) => {
  const { title, url, channelName, korTime, interval, isStream } = content;

  return (
    <div className={scheduleCard['description']}>
      <div className={[scheduleCard['channel_name'], addStreamModifier].join(' ')}>{channelName}</div>
      <div className={[scheduleCard['title'], addStreamModifier].join(' ')}>{title}</div>
      <div className={scheduleCard['time']}>
        <time className={scheduleCard['kor']}>{korTime}</time>
        <div className={scheduleCard['status']}>{isStream === 'TRUE' ? 'LIVE!' : interval}</div>
      </div>
      <div className={scheduleCard['link']}>
        <button onClick={() => openWindow(url)}>새 탭으로 열기</button>
        <CopyButton value={url} size="0.8rem" />
      </div>
    </div>
  );
};

export default ScheduleCardDesc;
