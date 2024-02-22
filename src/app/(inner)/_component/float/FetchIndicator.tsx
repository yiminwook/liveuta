'use client';
import cx from 'classnames';
import { useIsFetching, useIsMutating, useQueryClient } from '@tanstack/react-query';
import { IoGlobeOutline } from 'react-icons/io5';
import { AiOutlineLoading } from 'react-icons/ai';
import * as styles from './floatButton.css';
import GlobalLoading from '@/app/loading';

export default function FetchIndicator() {
  const queryClient = useQueryClient();
  const scheduleStatus = queryClient.getQueryState(['schedule'])?.status;

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (scheduleStatus === 'pending') {
    return <GlobalLoading />;
  }

  if (isFetching === 0 && isMutating === 0) {
    return null;
  }

  return (
    <div className={cx(styles.button, 'left')}>
      <IoGlobeOutline className={styles.networkSvg} color="inherit" size={'1.5rem'} />
      <AiOutlineLoading className={styles.loadingSvg} size={'2.25rem'} color="inherit" />
    </div>
  );
}
