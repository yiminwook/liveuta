import { useIsPipAtom, usePlayerAtom } from '@/atoms/player';
import { PipButton, PlayerBox } from '@/components/common/player/Style';
import { useEffect } from 'react';
import Player from '@/components/common/player/Player';
import LiveChat from '@/components/common/player/LiveChat';
import PlayerPlaceHolder from '@/components/common/player/PlayerPlaceHolder';
import { ContentsDataType } from '@/types/inSheet';

interface PlayerWrapProps {
  contents: ContentsDataType[];
  isTablet: boolean;
}

const PlayerWrap = ({ contents, isTablet }: PlayerWrapProps) => {
  const [playerValue, setPlayerValue] = usePlayerAtom();
  const [_, setIsPip] = useIsPipAtom();

  const getRandomIndex = () => {
    if (contents.length === 0) return null;
    const index = Math.floor(Math.random() * contents.length);
    return index;
  };

  useEffect(() => {
    const index = getRandomIndex();
    if (index === null) return;
    setPlayerValue((pre) => ({ ...pre, url: contents[index].url, videoId: contents[index].videoId }));
  }, []);

  return (
    <PlayerBox pip={playerValue.pip}>
      <PipButton pip={playerValue.pip} onClick={() => setIsPip(true)}>
        PIP
      </PipButton>
      {playerValue.pip ? <PlayerPlaceHolder /> : <Player />}
      <LiveChat videoId={playerValue.videoId} isTablet={isTablet} />
    </PlayerBox>
  );
};

export default PlayerWrap;
