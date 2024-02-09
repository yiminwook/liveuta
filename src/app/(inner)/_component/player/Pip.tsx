/** @jsxImportSource @emotion/react */
'use client';
import useResponsive from '@/hook/useResponsive';
import Player from './Player';
import { PipBase } from './Style';
import portal from '@/model/portal';

export default portal('pip', function Pip() {
  const { isMobile } = useResponsive();

  if (isMobile) return null;

  return (
    <div css={PipBase}>
      <Player isShow={false} />
    </div>
  );
});
