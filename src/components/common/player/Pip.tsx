'use client';
import { useSearchParams } from 'next/navigation';
import { isMobile } from 'react-device-detect';
import { createPortal } from 'react-dom';
import Player from './Player';
import css from './Player.module.scss';

export default function Pip() {
  const searchParams = useSearchParams();
  const isLive = searchParams.get('t') === 'live';

  const $wrapper = document.getElementById('pip');

  if (!$wrapper) {
    throw new Error('pip wrapper not exist');
  }

  if (isMobile || isLive) return null;

  return createPortal(
    <div className={css.pipBase}>
      <Player isShow={false} isLive={false} />
    </div>,
    $wrapper,
  );
}
