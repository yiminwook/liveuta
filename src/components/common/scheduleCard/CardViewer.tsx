import { IconUser } from '@tabler/icons-react';
import css from './Card.module.scss';

interface CardViewerProps {
  viewer: number;
}

export default function CardViewer({ viewer }: CardViewerProps) {
  return (
    <>
      <IconUser className={css.statusSvg} size="0.75rem" />
      {viewer?.toString() || '?'}
    </>
  );
}
