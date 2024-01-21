import { useIsPipAtom, usePlayerAtom } from '@/atoms/player';
import { PipButton, PlayerBox } from '@/components/common/player/Style';
import { useEffect, useRef, useState } from 'react';
import Player from '@/components/common/player/Player';
import LiveChat from '@/components/common/player/LiveChat';
import PlayerPlaceHolder from '@/components/common/player/PlayerPlaceHolder';
import { ContentsDataType } from '@/types/inSheet';

interface PlayerWrapProps {
  contents: ContentsDataType[];
  isDesktop: boolean;
}

const PlayerWrap = ({ contents, isDesktop }: PlayerWrapProps) => {
  const [playerValue, setPlayerValue] = usePlayerAtom();
  const [_, setIsPip] = useIsPipAtom();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  const getRandomIndex = () => {
    if (contents.length === 0) return null;
    const index = Math.floor(Math.random() * contents.length);
    return index;
  };

  const handleInteresect: IntersectionObserverCallback = (items, observer) => {
    const isIntersecting = items[0].isIntersecting;
    setIsShow(() => isIntersecting);
  };

  useEffect(() => {
    if (playerValue.url !== '') {
      //이미 atom에 url이 있는 경우 return
      return;
    }
    const index = getRandomIndex();
    if (index === null) return;
    setPlayerValue((pre) => ({ ...pre, url: contents[index].url, videoId: contents[index].videoId }));
  }, []);

  useEffect(() => {
    const current = wrapRef.current;
    if (current === null || playerValue.pip === true) return;
    // pip모드가 아닐때만 관찰
    const observer = new IntersectionObserver(handleInteresect);
    observer.observe(current);
    return () => observer.disconnect();
  }, [playerValue.pip]);

  const showPlaceholder = playerValue.pip === true || isShow === false;

  return (
    <PlayerBox pip={playerValue.pip} ref={wrapRef} isShow={isShow}>
      <PipButton pip={playerValue.pip} onClick={() => setIsPip(true)}>
        PIP
      </PipButton>
      {showPlaceholder ? <PlayerPlaceHolder /> : null}
      {!playerValue.pip ? <Player /> : null}
      <LiveChat videoId={playerValue.videoId} isDesktop={isDesktop} />
    </PlayerBox>
  );
};

export default PlayerWrap;
