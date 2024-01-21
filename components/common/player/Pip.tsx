import clientOnly from '@/models/clientOnly';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Player from '@/components/common/player/Player';
import { useIsPipAtom } from '@/atoms/player';
import { PipBox, PipCloseButton } from '@/components/common/player/Style';

const KEY = 'pipReactPlayer';

const Pip = () => {
  const [div] = useState(() => document.createElement('div'));
  const [isPip, setIsPip] = useIsPipAtom();

  useEffect(() => {
    if (isPip === false) return;
    div.setAttribute('id', KEY);
    document.body.appendChild(div);

    return () => {
      document.body.removeChild(div);
    };
  }, [isPip]);

  return createPortal(
    <PipBox>
      {isPip ? <PipCloseButton onClose={() => setIsPip(false)} /> : null}
      <Player />
    </PipBox>,
    div,
  );
};

export default clientOnly(Pip);
