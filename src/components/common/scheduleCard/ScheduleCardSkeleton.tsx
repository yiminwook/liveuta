import { Skeleton } from '@mantine/core';
import css from './ScheduleCardSkeleton.module.scss';

export default function ScheduleCardSkeleton() {
  return (
    <div className={css.card}>
      <Skeleton className={css.image} />
      <div className={css.titleBox}>
        <Skeleton className={css.title} />
      </div>
      <div className={css.descBox}>
        <Skeleton className={css.desc1} />
        <Skeleton className={css.desc2} />
      </div>
      <div className={css.footerBox}>
        <Skeleton className={css.footer1} />
        <div className={css.status}>
          <Skeleton className={css.footer2} />
        </div>
      </div>
    </div>
  );
}
