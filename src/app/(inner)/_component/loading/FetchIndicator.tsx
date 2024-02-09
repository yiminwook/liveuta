'use client';
import { isLoadingAtom } from '@/app/_lib/atom';
import cx from 'classnames';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { IoGlobeOutline } from 'react-icons/io5';
import { AiOutlineLoading } from 'react-icons/ai';
import fetchIndicator from './fetchIndicator.module.scss';

export default function FetchIndicator() {
  const isLoading = useAtomValue(isLoadingAtom);
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (isLoading === true || (isFetching === 0 && isMutating === 0)) {
    return null;
  }

  return (
    <div className={cx('foat', 'left', fetchIndicator['wrap'])}>
      <IoGlobeOutline color="inherit" size={'1.5rem'} />
      <AiOutlineLoading size={'2.25rem'} color="inherit" />
    </div>
  );
}
