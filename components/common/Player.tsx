import { usePlayerAtom } from '@/atoms';
import useResponsive from '@/hooks/useResponsive';
import clientOnly from '@/models/clientOnly';
import useSheet from '@/queries/sheet';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import CloseButton from './button/CloseButton';
import { BEZIER_CURVE } from '@/styles/var';

const PipButton = styled.button`
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1.5rem;
  background-color: orange;
  float: right;
  font-weight: 500;
  color: #fff;
  transition: all 0.3s ${BEZIER_CURVE};

  &:hover {
    background-color: #ffae00d2;
  }
`;

const PipCloseButton = styled(CloseButton)`
  color: #fff;
  background-color: salmon;
`;

const pipModifier = css`
  z-index: 50;
  position: fixed;
  left: 25px;
  bottom: 25px;
  width: 350px;

  & > .reactPlayer {
  }

  & > .liveChat {
    display: none;
  }
`;

const PlayerBox = styled.div<{ pip: boolean }>`
  display: flex;
  width: 100%;
  justify-content: center;

  .reactPlayer {
    aspect-ratio: 16 / 9;
  }

  ${({ pip }) => pip && pipModifier}
`;

const Player = () => {
  const [playerValue, setPlayerValue] = usePlayerAtom();
  const { isMobile, isTablet } = useResponsive();
  const { isLoad, contents } = useSheet();
  const player = useRef<ReactPlayer>(null);

  const handlePip = (open: boolean) => {
    setPlayerValue((pre) => ({ ...pre, pip: open }));
  };

  const handlePlay = (isPlaying: boolean) => {
    setPlayerValue((pre) => ({ ...pre, isPlaying }));
  };

  const getRandomIndex = () => {
    if (contents.length === 0) return null;
    const index = Math.floor(Math.random() * contents.length);
    return index;
  };

  useEffect(() => {
    if (!isLoad) return;
    console.log('isLoad', isLoad);
    const index = getRandomIndex();
    if (index === null) return;
    setPlayerValue((pre) => ({ ...pre, url: contents[index].url, videoId: contents[index].videoId }));
  }, [isLoad]);

  console.log('isMobile', isMobile);
  console.log('playerValue', playerValue);
  if (isMobile || playerValue.url === '') return null;

  return (
    <>
      <PlayerBox pip={playerValue.pip}>
        <ReactPlayer
          className={'reactPlayer'}
          width={'100%'}
          height={'auto'}
          ref={player}
          url={playerValue.url}
          muted={playerValue.isMutted}
          autoPlay={playerValue.isPlaying}
          playing={playerValue.isPlaying}
          onPlay={() => handlePlay(true)}
          onPause={() => handlePlay(false)}
          config={{ youtube: { playerVars: { control: 1, pip: true, suggestedQuality: 'hd720' } } }}
          controls={true}
        />
        {isTablet ? null : (
          <iframe
            className="liveChat"
            src={`https://www.youtube.com/live_chat?v=${
              playerValue.videoId
            }&embed_domain=${'liveuta.vercel.app'}&dark_theme=1`}
          />
        )}
        {playerValue.pip ? <PipCloseButton onClose={() => handlePip(false)} /> : null}
      </PlayerBox>
      {playerValue.pip ? null : <PipButton onClick={() => handlePip(true)}>PIP모드 개발중</PipButton>}
    </>
  );
};

export default clientOnly(Player);
