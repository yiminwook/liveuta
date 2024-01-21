import { useIsPipAtom, usePlayerAtom } from '@/atoms/player';
import { PipButton, PlayerBox, PlayerPlaceholder } from '@/components/common/player/Style';
import useResponsive from '@/hooks/useResponsive';
import clientOnly from '@/models/clientOnly';
import useSheet from '@/queries/sheet';
import { useEffect } from 'react';
import Player from '@/components/common/player/Player';
import LiveChat from './LiveChat';
import Image from 'next/image';

const PlayerWrap = () => {
  const [playerValue, setPlayerValue] = usePlayerAtom();
  const { isMobile, isTablet } = useResponsive();
  const { isLoad, contents, isLoadingSheet } = useSheet();
  const [pip, setIsPip] = useIsPipAtom();

  const getRandomIndex = () => {
    if (contents.length === 0) return null;
    const index = Math.floor(Math.random() * contents.length);
    return index;
  };

  useEffect(() => {
    if (!isLoad) return;
    const index = getRandomIndex();
    if (index === null) return;
    setPlayerValue((pre) => ({ ...pre, url: contents[index].url, videoId: contents[index].videoId }));
  }, [isLoad]);

  if (isMobile || isLoad === false) return null;

  return (
    <PlayerBox pip={pip}>
      <PipButton pip={pip} onClick={() => setIsPip(true)}>
        PIP
      </PipButton>
      {pip ? (
        <PlayerPlaceholder>
          <Image src={'/assets/icon-384-384.png'} alt="pip모드가 실행중입니다." width={384} height={384} />
          <p>현재 PIP 모드가 실행중입니다.</p>
        </PlayerPlaceholder>
      ) : (
        <Player />
      )}
      <LiveChat videoId={playerValue.videoId} isTablet={isTablet} />
    </PlayerBox>
  );
};

export default clientOnly(PlayerWrap);
