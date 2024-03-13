'use client';
import { player } from '@inner/_lib/atom/';
import { memo, useEffect, useRef, useState } from 'react';
import { ImYoutube } from 'react-icons/im';
import ReactPlayer from 'react-player';
import * as styles from './player.css';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { generateVideoUrl } from '@/model/youtube/url';
import { toast } from 'sonner';
import { useAtom, useSetAtom } from 'jotai';
import { BsLightningFill } from 'react-icons/bs';
import { ORIGIN } from '@/const';
import { useHotkeys } from 'react-hotkeys-hook';

interface PlayerProps {
  isShow: boolean;
  isLive: boolean;
}

export default memo(function Player({ isLive, isShow }: PlayerProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [playerValue] = useAtom(player.playerAtom);
  const setStatus = useSetAtom(player.playerStatusAtom);
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

  const navigateLive = () => router.push('/live');

  useEffect(() => {
    if (isReady === true) {
      playerRef.current?.seekTo(playerValue.timeline, 'seconds');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerValue.timeline]);

  const left = isShow === false && playerValue.hide;
  const url = generateVideoUrl(playerValue.videoId);

  return (
    <div className={cx(isShow === false && styles.pipBase, styles.playerDiv, left && 'left')}>
      <ReactPlayer
        className={cx(styles.playerBase, 'reactPlayer')}
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
        fallback={<div className={styles.playerPlaceholder} />}
        onError={(e) => {
          console.error('Player', e);
          console.log('url', url);
          toast.error('실행 할 수 없는 영상입니다.');
          // setVideoId(() => IINITIAL_PLAYER_VIDEO_ID);
          // setStatus((pre) => ({ ...pre, isPlaying: false }));
        }}
      />
      <button className={cx(styles.pipButton, isShow === false && 'hide')} onClick={toggleLeft}>
        <ImYoutube size={28} />
      </button>
      <button
        disabled={isLive}
        className={cx(styles.liveButton, isShow === false && 'hide')}
        onClick={navigateLive}
      >
        <BsLightningFill size={28} />
      </button>
    </div>
  );
});
