//import { isStream } from '@/types/inSheet';
import { isStream } from '@/types/inMongoDB';
import { StatusBox } from '@/components/common/scheduleCard/Style';
import CardViewer from '@/components/common/scheduleCard/CardViewer';

interface CardStatusProps {
  isStream: isStream;
  interval: string;
  videoId: string;
}

const CardStatus = ({ isStream, interval, videoId }: CardStatusProps) => {
  return <StatusBox>{isStream !== 'TRUE' ? interval : <CardViewer videoId={videoId} />}</StatusBox>;
};

export default CardStatus;
