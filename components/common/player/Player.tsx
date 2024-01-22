import { usePlayerAtom } from '@/atoms/player';
import { PipButton, PlayerDiv } from '@/components/common/player/Style';
import useToast from '@/hooks/useToast';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { ImYoutube } from 'react-icons/im';

interface PlayerRefProps {
  showPreview: boolean;
  volume: number;
}
interface PlayerProps {
  isShow: boolean;
}

const Player = ({ isShow }: PlayerProps) => {
  const player = useRef<ReactPlayer>(null);
  const [isReady, setIsReady] = useState(false);
  const [playerValue, setPlayerValue] = usePlayerAtom();
  const [volume, setVolume] = useState(100);
  const toast = useToast();

  const keyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    if (target === null) return;
    const tagName = target.tagName;
    const classList = target.classList;
    if (tagName === 'BODY' || classList.contains('imageLink')) {
      if (e.key === ' ') {
        e.preventDefault();
        // 스페이스바 이벤트 방지
        setPlayerValue((pre) => {
          toast.info({ text: `플레이어 ${pre.isPlaying ? '정지' : '재생'}`, duration: 2 });
          return { ...pre, isPlaying: !pre.isPlaying };
        });
      }
      if (e.key === 'Escape') {
        setPlayerValue((pre) => {
          toast.info({ text: `플레이어 ${pre.hide ? '보이기' : '숨기기'}`, duration: 2 });
          return { ...pre, hide: !pre.hide };
        });
      }
      if (e.key === 'ArrowRight') {
        setVolume((pre) => {
          if (pre >= 100) {
            toast.warning({ text: `최대 볼륨입니다.`, duration: 2 });
            return 100;
          }
          toast.info({ text: `현재볼륨 ${pre}%`, duration: 2 });
          return pre + 10;
        });
      }
      if (e.key === 'ArrowLeft') {
        // setVolume((pre) => {
        //   if (pre <= 0) {
        //     toast.warning({ text: `최소 볼륨입니다.`, duration: 2 });
        //     return 0;
        //   }
        //   toast.info({ text: `현재볼륨 ${pre}%`, duration: 2 });
        //   return pre - 10;
        // });
        player.current?.setState((pre: PlayerRefProps) => {
          console.log(pre);
          return { ...pre, volume: pre.volume + 0.1 };
        });
      }
    }
  };

  const handlePlay = (isPlaying: boolean) => {
    setPlayerValue((pre) => ({ ...pre, isPlaying }));
  };

  const toggleLeft = () => {
    setPlayerValue((pre) => ({ ...pre, hide: !pre.hide }));
  };

  useEffect(() => {
    if (isReady === false) return;
    document.addEventListener('keydown', keyDown);
    return () => document.removeEventListener('keydown', keyDown);
  }, [isReady]);

  const left = isShow === false && playerValue.hide;
  console.log('canEnablePIP', ReactPlayer.canEnablePIP(playerValue.url));

  return (
    <PlayerDiv isShow={isShow} left={left}>
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
        config={{ youtube: { playerVars: { control: 1, suggestedQuality: 'hd720' } } }}
        controls={true}
        volume={1}
        onReady={() => setIsReady(() => true)}
      />
      <PipButton className="hideButton" onClick={toggleLeft}>
        <ImYoutube size={'1.87rem'} />
      </PipButton>
    </PlayerDiv>
  );
};

export default Player;
