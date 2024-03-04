'use client';
import cx from 'classnames';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { IoGlobeOutline } from 'react-icons/io5';
import { AiOutlineLoading } from 'react-icons/ai';
import * as styles from './floatButton.css';
import { MdMyLocation } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import useScheduleStatus from '@/hook/useScheduleStatus';
import GlobalLoading from '@/app/loading';
import MainLoading from '../loading/MainLoading';

interface ToggleButtonProps {
  isOpen: boolean;
  onClick?: () => void;
}

export default function ToggleButton({ isOpen, onClick }: ToggleButtonProps) {
  const status = useScheduleStatus();
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const unFetching = isFetching === 0 && isMutating === 0;

  if (status === 'pending') return <MainLoading backdrop={true} />;

  if (unFetching) {
    return (
      <button className={cx(styles.toggleButton, 'right', 'hover')} onClick={onClick}>
        {isOpen ? (
          <IoClose size="32px" color="inherit" />
        ) : (
          <MdMyLocation size="32px" color="inherit" />
        )}
      </button>
    );
  }

  return (
    <button className={cx(styles.toggleButton, 'right', 'hover')} onClick={onClick}>
      <IoGlobeOutline className={styles.networkSvg} size="24px" color="inherit" />
      <AiOutlineLoading className={styles.loadingSvg} size="36px" color="inherit" />
    </button>
  );
}
