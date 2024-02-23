'use client';
import cx from 'classnames';
import { useIsFetching, useIsMutating, useQueryClient } from '@tanstack/react-query';
import { IoGlobeOutline } from 'react-icons/io5';
import { AiOutlineLoading } from 'react-icons/ai';
import * as styles from './floatButton.css';
import { MdMyLocation } from 'react-icons/md';
import GlobalLoading from '@/app/loading';

interface ToggleButtonProps {
  onClick?: () => void;
}

export default function ToggleButton({ onClick }: ToggleButtonProps) {
  const queryClient = useQueryClient();
  const scheduleStatus = queryClient.getQueryState(['schedule'])?.status;
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const unFetching = isFetching === 0 && isMutating === 0;

  if (scheduleStatus === 'pending') {
    return <GlobalLoading />;
  }

  return (
    <button className={cx(styles.toggleButton, 'right', 'hover')} onClick={onClick}>
      {unFetching ? (
        <MdMyLocation size="32px" color="inherit" />
      ) : (
        <>
          <IoGlobeOutline className={styles.networkSvg} size="24px" color="inherit" />
          <AiOutlineLoading className={styles.loadingSvg} size="36px" color="inherit" />
        </>
      )}
    </button>
  );
}
