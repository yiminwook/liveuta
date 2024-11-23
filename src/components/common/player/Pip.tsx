'use client';
import { useSearchParams } from 'next/navigation';
import { isMobile } from 'react-device-detect';
import Player from './Player';
import * as styles from './player.css';
import { createPortal } from 'react-dom';

export default function Pip() {
  const searchParams = useSearchParams();
  const isLive = searchParams.get('tab') === 'live';

  const $wrapper = document.getElementById('pip');

  if (!$wrapper) {
    throw new Error('pip wrapper not exist');
  }

  if (isMobile || isLive) return null;

  return createPortal(
    <div className={styles.pipBase}>
      <Player isShow={false} isLive={false} />
    </div>,
    $wrapper,
  );
}
