import IonPerson from '@icons/ion/Person';
import css from './Card.module.scss';

interface CardViewerProps {
  viewer: number;
}

export default function CardViewer({ viewer }: CardViewerProps) {
  return (
    <>
      <IonPerson className={css.statusSvg} width="0.75rem" height="0.75rem" />
      {viewer?.toString() || '?'}
    </>
  );
}
