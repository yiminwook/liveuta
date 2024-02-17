'use client';
import useResponsive from '@/hook/useResponsive';
import Player from './Player';
import portal from '@/model/portal';
import * as styles from './player.css';

export default portal('pip', function Pip() {
  const { isMobile } = useResponsive();

  if (isMobile) return null;

  return (
    <div className={styles.pipBase}>
      <Player isShow={false} />
    </div>
  );
});
