import { usePlayerAtom } from '@/atoms';
import useResponsive from '@/hooks/useResponsive';
import clientOnly from '@/models/clientOnly';
import useSheet from '@/queries/sheet';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const Player = () => {
  const [playerValue, setPlayerValue] = usePlayerAtom();
  const { isMobile } = useResponsive();
  const { isLoad, contents } = useSheet();
  const [pip, setPip] = useState(false);
  const player = useRef<ReactPlayer>(null);

  const togglePip = () => {
    setPip((pre) => !pre);
  };

  const handlePlay = (isPlaying: boolean) => {
    setPlayerValue((pre) => ({ ...pre, isPlaying }));
  };

  useEffect(() => {
    if (!isLoad) return;
    console.log('isLoad', isLoad);
    setPlayerValue((pre) => ({ ...pre, url: getRandomUrl() }));
  }, [isLoad]);

  const getRandomUrl = () => {
    if (contents.length === 0) return '';
    const index = Math.floor(Math.random() * contents.length);
    return contents[index].url;
  };

  console.log('pip', pip);
  console.log('isMobile', isMobile);
  console.log('playerValue', playerValue);
  if (isMobile || playerValue.url === '') return null;

  return (
    <>
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
      <button onClick={togglePip}>PIP모드개발중</button>
    </>
  );
};

export default clientOnly(Player);
