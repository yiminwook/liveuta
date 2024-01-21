import { usePlayerAtom } from '@/atoms/player';
import { StyledPlayer } from '@/components/common/player/Style';
import { useRef } from 'react';
import ReactPlayer from 'react-player';

interface PlayerProps {}

const Player = ({}: PlayerProps) => {
  const player = useRef<ReactPlayer>(null);
  const [playerValue, setPlayerValue] = usePlayerAtom();

  const handlePlay = (isPlaying: boolean) => {
    setPlayerValue((pre) => ({ ...pre, isPlaying }));
  };

  if (playerValue.url === '') return null;

  return (
    <StyledPlayer
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
      config={{ youtube: { playerVars: { control: 1, suggestedQuality: 'hd720' } } }}
      controls={true}
    />
  );
};

export default Player;
