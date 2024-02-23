'use client';
import cx from 'classnames';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { IoGlobeOutline } from 'react-icons/io5';
import { AiOutlineLoading } from 'react-icons/ai';
import * as styles from './floatButton.css';
import { MdMyLocation } from 'react-icons/md';

interface ToggleButtonProps {
  onClick?: () => void;
}

export default function ToggleButton({ onClick }: ToggleButtonProps) {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const unFetching = isFetching === 0 && isMutating === 0;

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
