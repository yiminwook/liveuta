//import { isStream } from '@/types/inSheet';
import { isStream } from '@/type/api/mongoDB';
import { StatusBox } from './Style';
import CardViewer from './CardViewer';

interface CardStatusProps {
  isStream: isStream;
  interval: string;
  videoId: string;
}

export default function CardStatus({ isStream, interval, videoId }: CardStatusProps) {
  return <StatusBox>{isStream !== 'TRUE' ? interval : <CardViewer videoId={videoId} />}</StatusBox>;
}
