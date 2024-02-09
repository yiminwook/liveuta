/** @jsxImportSource @emotion/react */
import useResponsive from '@/hook/useResponsive';
import clientOnly from '@/model/clientOnly';
import Player from './Player';
import { PipBase } from './Style';

const Pip = () => {
  const { isMobile } = useResponsive();

  if (isMobile) return null;

  return (
    <div css={PipBase}>
      <Player isShow={false} />
    </div>
  );
};

export default clientOnly(Pip);
