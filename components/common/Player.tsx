import { usePlayerAtom } from '@/atoms';
import useResponsive from '@/hooks/useResponsive';
import clientOnly from '@/models/clientOnly';
import useSheet from '@/queries/sheet';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const PlayerBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;

  & > iframe {
  }
`;

const Player = () => {
  const [playerValue, setPlayerValue] = usePlayerAtom();
  const { isMobile, isTablet } = useResponsive();
  const { isLoad, contents } = useSheet();
  const [pip, setPip] = useState(false);
  const player = useRef<ReactPlayer>(null);

  const togglePip = () => {
    setPip((pre) => !pre);
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

  console.log('pip', pip);
  console.log('isMobile', isMobile);
  console.log('playerValue', playerValue);
  if (isMobile || playerValue.url === '') return null;

  return (
    <>
      <PlayerBox>
        <ReactPlayer
          ref={player}
          url={playerValue.url}
          pip={pip}
          muted={playerValue.isMutted}
          autoPlay={playerValue.isPlaying}
          playing={playerValue.isPlaying}
          onPlay={() => handlePlay(true)}
          onPause={() => handlePlay(false)}
          config={{ youtube: { playerVars: { control: 1, pip: true } } }}
          controls={true}
        />
        {isTablet ? null : (
          <iframe
            src={`https://www.youtube.com/live_chat?v=${
              playerValue.videoId
            }&embed_domain=${'liveuta.vercel.app'}&dark_theme=1`}
            // width={'100%'}
            // height={'100%'}
            // frameBorder="0"
            // data-gtm-yt-inspected-9={true}
          />
        )}
      </PlayerBox>
      <button onClick={togglePip}>PIP모드개발중</button>
    </>
  );
};

export default clientOnly(Player);
