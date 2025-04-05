'use client';
import { ORIGIN } from '@/constants';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { usePlayerCtx } from '@/stores/player';
import classnames from 'classnames';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import { memo, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import ReactPlayer from 'react-player';
import { toast } from 'sonner';
import { useStore } from 'zustand';
import css from './Player.module.scss';

type Props = {};

export default memo(function PipPlayer({}: Props) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const playerCtx = usePlayerCtx();
  const store = useStore(playerCtx);
  const t = useTranslations('global.player');

  useHotkeys(
    'esc',
    () => {
      toast.info(`${t('title')} ${store.isHide ? t('show') : t('hide')}`);
      store.actions.toggleIsHide();
    },
    { enabled: isReady, scopes: ['*'] },
  );

  useHotkeys(
    'backspace',
    () => {
      toast.info(`${t('title')} ${store.isPlaying ? t('pause') : t('play')}`);
      store.actions.toggleIsPlaying();
    },
    { enabled: isReady, scopes: ['*'], preventDefault: true },
  );

  const handlePlay = (isPlaying: boolean) => {
    store.actions.setIsPlaying(isPlaying);
  };

  const toggleLeft = () => {
    store.actions.toggleIsHide();
  };

  const navigateLive = () => router.push('/schedule?t=live');

  useEffect(() => {
    if (isReady === true) {
      playerRef.current?.seekTo(store.timeline, 'seconds');
    }
  }, [store.timeline]);

  const url = generateVideoUrl(store.videoId);

  return (
    <div>
      <ReactPlayer
        className={classnames('reactPlayer')}
        width="100%"
        height="auto"
        ref={playerRef}
        url={url}
        muted={store.isMutted}
        playing={store.isPlaying}
        onPlay={() => handlePlay(true)}
        onPause={() => handlePlay(false)}
        config={{
          youtube: {
            // https://developers.google.com/youtube/iframe_api_reference?hl=ko#setPlaybackQuality
            playerVars: {
              origin: ORIGIN,
              start: store.timeline, //시작하는 시간
            },
          },
        }}
        controls={true}
        onReady={() => setIsReady(() => true)}
        fallback={<div className={css.playerPlaceholder} />}
        onError={(e) => {
          console.error('Player', e);
          console.log('url', url);
          toast.error(t('cannotPlayError'));
        }}
      />
    </div>
  );
});
