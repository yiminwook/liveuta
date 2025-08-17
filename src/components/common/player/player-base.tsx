'use client';
import clsx from 'clsx';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import ReactPlayer from 'react-player';
import { toast } from 'sonner';
import { ORIGIN } from '@/constants';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { generateVideoUrl } from '@/libraries/youtube/url';
import { usePlayer } from '@/stores/player';
import css from './player.module.scss';

type Props = {
  mode: 'default' | 'pip';
  locale: TLocaleCode;
};

export default memo(function PlayerBase({ mode, locale }: Props) {
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const store = usePlayer();
  const { t } = useTranslations();
  const url = useMemo(() => generateVideoUrl(store.videoId), [store.videoId]);

  useHotkeys(
    'backspace',
    () => {
      toast.info(
        `${t('global.player.title')} ${store.isPlaying ? t('global.player.pause') : t('global.player.play')}`,
      );
      store.actions.toggleIsPlaying();
    },
    { enabled: isReady, scopes: ['*'], preventDefault: true },
  );

  const handlePlay = (isPlaying: boolean) => {
    store.actions.setIsPlaying(isPlaying);
    store.actions.setIsHide(false);
  };

  useEffect(() => {
    if (isReady === true) {
      playerRef.current?.seekTo(store.timeline, 'seconds');
    }
  }, [store.timeline]);

  return (
    <ReactPlayer
      className={clsx({
        [css.playerBase]: mode === 'default',
        [css.pipBase]: mode === 'pip',
      })}
      width={mode === 'default' ? '100%' : '350px'}
      height="auto"
      ref={playerRef}
      url={url}
      muted={store.isMuted}
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
      onError={(e) => {
        console.error('Player', e);
        console.log('url', url);
        toast.error(t('global.player.cannotPlayError'));
      }}
    />
  );
});
