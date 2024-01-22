import { usePlayerAtom } from '@/atoms/player';
import { PlayerBox } from '@/components/common/player/Style';
import { useEffect, useRef, useState } from 'react';
import Player from '@/components/common/player/Player';
import LiveChat from '@/components/common/player/LiveChat';
import PlayerPlaceHolder from '@/components/common/player/PlayerPlaceHolder';

interface PlayerWrapProps {
  isDesktop: boolean;
}

const PlayerWrap = ({ isDesktop }: PlayerWrapProps) => {
  const [playerValue] = usePlayerAtom();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  const handleInteresect: IntersectionObserverCallback = (items, observer) => {
    const isIntersecting = items[0].isIntersecting;
    setIsShow(() => isIntersecting);
  };

  useEffect(() => {
    const current = wrapRef.current;
    if (current === null) return;
    const observer = new IntersectionObserver(handleInteresect);
    observer.observe(current);
    return () => observer.disconnect();
  }, []);

  const showPlaceholder = isShow === false;

  return (
    <PlayerBox ref={wrapRef}>
      {showPlaceholder ? <PlayerPlaceHolder /> : null}
      <Player isShow={isShow} />
      <LiveChat videoId={playerValue.videoId} isDesktop={isDesktop} />
    </PlayerBox>
  );
};

export default PlayerWrap;
