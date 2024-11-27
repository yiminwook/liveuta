import { FaUsers } from 'react-icons/fa';
import css from './ScheduleCard.module.scss';

interface CardViewerProps {
  viewer: number;
}

export default function CardViewer({ viewer }: CardViewerProps) {
  return (
    <>
      <FaUsers className={css.statusSvg} size={'0.75rem'} />
      {viewer?.toString() || '?'}
    </>
  );
}
