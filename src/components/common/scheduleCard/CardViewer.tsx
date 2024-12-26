import css from './ScheduleCard.module.scss';

interface CardViewerProps {
  viewer: number;
}

export default function CardViewer({ viewer }: CardViewerProps) {
  return (
    <>
      <IconIonPerson className={css.statusSvg} size={'0.75rem'} />
      {viewer?.toString() || '?'}
    </>
  );
}
