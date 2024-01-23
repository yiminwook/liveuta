import Player from '@/components/common/player/Player';
import { PipBox } from '@/components/common/player/Style';
import useResponsive from '@/hooks/useResponsive';
import clientOnly from '@/models/clientOnly';

const Pip = () => {
  const { isMobile } = useResponsive();

  if (isMobile) return null;

  return (
    <PipBox>
      <Player isShow={false} />
    </PipBox>
  );
};

export default clientOnly(Pip);
