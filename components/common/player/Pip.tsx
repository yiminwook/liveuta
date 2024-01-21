import Player from '@/components/common/player/Player';
import { useIsPipAtom } from '@/atoms/player';
import { PipBox, PipCloseButton } from '@/components/common/player/Style';

const Pip = () => {
  const [isPip, setIsPip] = useIsPipAtom();

  if (isPip === false) return null;

  return (
    <PipBox>
      {isPip ? <PipCloseButton onClose={() => setIsPip(false)} /> : null}
      <Player />
    </PipBox>
  );
};

export default Pip;
