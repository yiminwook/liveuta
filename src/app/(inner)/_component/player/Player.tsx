'use client';
import { player } from '@inner/_lib/atom/';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { ImYoutube } from 'react-icons/im';
import ReactPlayer from 'react-player';
import * as styles from './player.css';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { generateVideoUrl } from '@/model/youtube/url';
import { toast } from 'sonner';
import { IINITIAL_PLAYER_VIDEO_ID } from '@/const';
import { useAtom } from 'jotai';
import { BsLightningFill } from 'react-icons/bs';

interface PlayerProps {
  isShow: boolean;
  isLive: boolean;
}

export default function Player({ isLive, isShow }: PlayerProps) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [videoId, setVideoId] = useAtom(player.playerVideoIdAtom);
  const [status, setStatus] = useAtom(player.playerStatusAtom);
  const playerRef = useRef<ReactPlayer>(null);

  const keyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    if (target === null) return;
    const tagName = target.tagName;
    const classList = target.classList;
    if (tagName === 'BODY' || classList.contains('imageLink')) {
      if (e.key === ' ') {
        e.preventDefault();
        // 스페이스바 이벤트 방지
        setStatus((pre) => {
          toast.info(`플레이어 ${pre.isPlaying ? '정지' : '재생'}`);
          return { ...pre, isPlaying: !pre.isPlaying };
        });
      }
      if (e.key === 'Escape') {
        setStatus((pre) => {
          toast.info(`플레이어 ${pre.hide ? '보이기' : '숨기기'}`);
          return { ...pre, hide: !pre.hide };
        });
      }
    }
  };

  const handlePlay = (isPlaying: boolean) => {
    setStatus((pre) => ({ ...pre, isPlaying }));
  };

  const toggleLeft = () => {
    setStatus((pre) => ({ ...pre, hide: !pre.hide }));
  };

  const navigateLive = () => router.push('/live');

  useEffect(() => {
    if (isReady === false) return;
    document.addEventListener('keydown', keyDown);
    return () => document.removeEventListener('keydown', keyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    if (isReady === true) {
      playerRef.current?.seekTo(status.timeline);
    }
  }, [isReady, status.timeline]);

  const left = isShow === false && status.hide;
  const url = generateVideoUrl(videoId);

  return (
    <div className={cx(isShow === false && styles.pipBase, styles.playerDiv, left && 'left')}>
      <ReactPlayer
        className={cx(styles.playerBase, 'reactPlayer')}
        width="100%"
        height="auto"
        ref={playerRef}
        url={url}
        muted={status.isMutted}
        autoPlay={status.isPlaying}
        playing={status.isPlaying}
        onPlay={() => handlePlay(true)}
        onPause={() => handlePlay(false)}
        config={{ youtube: { playerVars: { suggestedQuality: 'hd720' } } }}
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
}
