import Player from '@/components/common/player/Player';
import { PipBox } from '@/components/common/player/Style';
import clientOnly from '@/models/clientOnly';
import { usePathname } from 'next/navigation';

const Pip = () => {
  const isLivePath = usePathname().split('/')[1] === 'live';

  if (isLivePath) return null;

  return (
    <PipBox>
      <Player isShow={false} />
    </PipBox>
  );
};

export default clientOnly(Pip);
