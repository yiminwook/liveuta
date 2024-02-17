'use client';
import { isLoadingAtom } from '@/app/_lib/atom';
import cx from 'classnames';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { IoGlobeOutline } from 'react-icons/io5';
import { AiOutlineLoading } from 'react-icons/ai';
import * as styles from './floatButton.css';

export default function FetchIndicator() {
  const isLoading = useAtomValue(isLoadingAtom);
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (isLoading === true || (isFetching === 0 && isMutating === 0)) {
    return null;
  }

  return (
    <div className={cx(styles.button, 'left')}>
      <IoGlobeOutline className={styles.networkSvg} color="inherit" size={'1.5rem'} />
      <AiOutlineLoading className={styles.loadingSvg} size={'2.25rem'} color="inherit" />
    </div>
  );
}