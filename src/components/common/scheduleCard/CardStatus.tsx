//import { isStream } from '@/types/inSheet';
import { isStream } from '@/types/api/mongoDB';
import CardViewer from './CardViewer';
import css from './ScheduleCard.module.scss';
interface CardStatusProps {
  isStream: isStream;
  interval: string;
  viewer: number;
}

export default function CardStatus({ isStream, interval, viewer }: CardStatusProps) {
  return (
    <div className={css.statusBox}>
      {isStream !== 'TRUE' ? interval : <CardViewer viewer={viewer} />}
    </div>
  );
}
