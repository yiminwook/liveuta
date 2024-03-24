'use client';
import portal from '@/model/portal';
import { isMobile } from 'react-device-detect';
import Player from './Player';
import * as styles from './player.css';

export default portal('pip', function Pip() {
  if (isMobile) return null;

  return (
    <div className={styles.pipBase}>
      <Player isShow={false} isLive={false} />
    </div>
  );
});
