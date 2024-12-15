'use client';
import { ORIGIN } from '@/constants';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { playerAtom, playerStatusAtom } from '@/stores/player';
import classnames from 'classnames';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next-nprogress-bar';
import { useTransitionRouter } from 'next-view-transitions';
import { memo, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { BsLightningFill } from 'react-icons/bs';
import { ImYoutube } from 'react-icons/im';
import ReactPlayer from 'react-player';
import { toast } from 'sonner';
import css from './Player.module.scss';

type PlayerProps = {
  isShow: boolean;
  isLive: boolean;
};

export default memo(function Player({ isLive, isShow }: PlayerProps) {
  const router = useRouter(useTransitionRouter);
  const [isReady, setIsReady] = useState(false);
  const [playerValue] = useAtom(playerAtom);
  const setStatus = useSetAtom(playerStatusAtom);
  const playerRef = useRef<ReactPlayer>(null);

  useHotkeys(
    'esc',
    () => {
      setStatus((pre) => {
        toast.info(`플레이어 ${pre.hide ? '보이기' : '숨기기'}`);
        return { ...pre, hide: !pre.hide };
      });
    },
    { enabled: isReady, scopes: ['*'] },
  );

  useHotkeys(
    'space',
    () => {
      setStatus((pre) => {
        toast.info(`플레이어 ${pre.isPlaying ? '정지' : '재생'}`);
        return { ...pre, isPlaying: !pre.isPlaying };
      });
    },
    { enabled: isReady, scopes: ['*'], preventDefault: true },
  );

  const handlePlay = (isPlaying: boolean) => {
    setStatus((pre) => ({ ...pre, isPlaying }));
  };

  const toggleLeft = () => {
    setStatus((pre) => ({ ...pre, hide: !pre.hide }));
  };

  const navigateLive = () => router.push('/schedule?t=live');

  useEffect(() => {
    if (isReady === true) {
      playerRef.current?.seekTo(playerValue.timeline, 'seconds');
    }
  }, [playerValue.timeline]);

  const left = isShow === false && playerValue.hide;
  const url = generateVideoUrl(playerValue.videoId);

  return (
    <div
      className={classnames(css.playerDiv, {
        left,
        [css.pipBase]: !isShow,
      })}
    >
      <ReactPlayer
        className={classnames(css.playerBase, 'reactPlayer')}
        width="100%"
        height="auto"
        ref={playerRef}
        url={url}
        muted={playerValue.isMutted}
        playing={playerValue.isPlaying}
        onPlay={() => handlePlay(true)}
        onPause={() => handlePlay(false)}
        config={{
          youtube: {
            playerVars: {
              suggestedQuality: 'hd720',
              origin: ORIGIN,
              start: playerValue.timeline, //시작하는 시간
            },
          },
        }}
        controls={true}
        onReady={() => setIsReady(() => true)}
        fallback={<div className={css.playerPlaceholder} />}
        onError={(e) => {
          console.error('Player', e);
          console.log('url', url);
          toast.error('실행 할 수 없는 영상입니다.');
          // setVideoId(() => IINITIAL_PLAYER_VIDEO_ID);
          // setStatus((pre) => ({ ...pre, isPlaying: false }));
        }}
      />
      <button className={classnames(css.pipBtn, { hide: !isShow })} onClick={toggleLeft}>
        <ImYoutube size={28} />
      </button>
      <button
        disabled={isLive}
        className={classnames(css.liveBtn, { hide: !isShow })}
        onClick={navigateLive}
      >
        <BsLightningFill size={28} />
      </button>
    </div>
  );
});
