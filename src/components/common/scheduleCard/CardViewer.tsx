import { FaUsers } from 'react-icons/fa';
import * as styles from './card.css';

interface CardViewerProps {
  viewer: number;
}

export default function CardViewer({ viewer }: CardViewerProps) {
  return (
    <>
      <FaUsers className={styles.statusSvg} size={'0.75rem'} />
      {viewer?.toString() || '?'}
    </>
  );
}
