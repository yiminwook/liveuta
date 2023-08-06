import scheduleCard from '@/components/common/scheduleCard/ScheduleCard.module.scss';
import { openWindow } from '@/utils/windowEvent';
import CopyButton from '@/components/common/button/CopyButton';
import { ContentsDataType } from '@/types/inSheet';
import { combineClassName } from '@/utils/combineClassName';

interface ScheduleCardDescProps {
  content: ContentsDataType;
  addStreamModifier: string;
}

const ScheduleCardDesc = ({ content, addStreamModifier }: ScheduleCardDescProps) => {
  const { title, url, channelName, korTime, interval, isStream } = content;

  return (
    <div className={scheduleCard['description']}>
      <div className={combineClassName(scheduleCard['channel_name'], addStreamModifier)}>{channelName}</div>
      <div className={combineClassName(scheduleCard['title'], addStreamModifier)}>{title}</div>
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
