/** @jsxImportSource @emotion/react */
import Player from '@/components/common/player/Player';
import { PipBase } from '@/components/common/player/Style';
import useResponsive from '@/hook/useResponsive';
import clientOnly from '@/model/clientOnly';

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
