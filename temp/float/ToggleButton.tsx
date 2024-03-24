import cx from 'classnames';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { IoGlobeOutline } from 'react-icons/io5';
import { AiOutlineLoading } from 'react-icons/ai';
import * as styles from './floatButton.css';
import { MdMyLocation } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import MainLoading from '../loading/MainLoading';
import useScheduleStatus from '@/hook/useScheduleStatus';
import { useHotkeys, useHotkeysContext } from 'react-hotkeys-hook';
import { useEffect } from 'react';

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ToggleButton({ isOpen, onClick }: ToggleButtonProps) {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const status = useScheduleStatus();
  const { enableScope, disableScope, enabledScopes } = useHotkeysContext();

  useHotkeys('esc', onClick, {
    enabled: enabledScopes.at(-1) === 'float',
    preventDefault: true,
    scopes: ['float'],
  });

  useHotkeys('space', (e) => {}, {
    enabled: isOpen,
    preventDefault: true,
    scopes: ['float'],
  });

  useEffect(() => {
    isOpen ? enableScope('float') : disableScope('float');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
