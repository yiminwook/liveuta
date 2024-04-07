'use client';
import portal from '@/model/portal';
import { useSearchParams } from 'next/navigation';
import { isMobile } from 'react-device-detect';
import Player from './Player';
import * as styles from './player.css';

export default portal('pip', function Pip() {
  const searchParams = useSearchParams();
  const isLive = searchParams.get('tab') === 'live';

  if (isMobile || isLive) return null;

  return (
    <div className={styles.pipBase}>
      <Player isShow={false} isLive={false} />
    </div>
  );
});
