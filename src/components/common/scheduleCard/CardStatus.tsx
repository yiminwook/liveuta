import { TStream } from '@/types/api/mongoDB';
import css from './Card.module.scss';
import CardViewer from './CardViewer';
interface CardStatusProps {
  isStream: TStream;
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
