import { Users } from 'lucide-react';
import css from './Card.module.scss';

interface CardViewerProps {
  viewer: number;
}

export default function CardViewer({ viewer }: CardViewerProps) {
  return (
    <>
      <Users className={css.statusSvg} size="0.75rem" />
      {viewer?.toString() || '?'}
    </>
  );
}
