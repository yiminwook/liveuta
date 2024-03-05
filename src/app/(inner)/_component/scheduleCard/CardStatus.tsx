//import { isStream } from '@/types/inSheet';
import { isStream } from '@/type/api/mongoDB';
import CardViewer from './CardViewer';
import * as styles from './card.css';

interface CardStatusProps {
  isStream: isStream;
  interval: string;
  viewer: number;
}

export default function CardStatus({ isStream, interval, viewer }: CardStatusProps) {
  return (
    <div className={styles.statusBox}>
      {isStream !== 'TRUE' ? interval : <CardViewer viewer={viewer} />}
    </div>
  );
}
