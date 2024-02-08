import { usePlayerAtom } from '@/app/(inner)/_lib/atom';
import { PipButton, PlayerDiv } from '@/components/common/player/Style';
import useToast from '@/hook/useToast';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { ImYoutube } from 'react-icons/im';
import { PlayerPlaceholder } from '@/components/common/player/Style';

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
        config={{ youtube: { playerVars: { suggestedQuality: 'hd720' } } }}
        controls={true}
        onReady={() => setIsReady(() => true)}
        fallback={<PlayerPlaceholder />}
      />
      <PipButton className="hideButton" onClick={toggleLeft}>
        <ImYoutube size={'1.87rem'} />
      </PipButton>
    </PlayerDiv>
  );
};

export default Player;
