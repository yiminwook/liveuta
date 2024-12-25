'use client';
import Show from '@/components/common/utils/Show';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { usePlayerActions, usePlayerStore } from './Context';
import css from './Player.module.scss';

export default function Player() {
  const url = usePlayerStore((state) => state.url);
  const playerRef = usePlayerStore((state) => state.playerRef);
  const initialPlay = usePlayerStore((state) => state.playerReady);
  const { onPlayerReady } = usePlayerActions();

  const onReady = () => {
    if (initialPlay) {
      return;
    }

    onPlayerReady();
  };

  return (
    <Show
      when={url !== ''}
      fallback={
        <div className={css.imageBox}>
          <Image
            className={css.image}
            src="/assets/icon-256-256.png"
            width={256}
            height={256}
            alt="loading"
          />
        </div>
      }
    >
      <ReactPlayer
        className={css.player}
        width="100%"
        height="100%"
        url={url}
        onReady={onReady}
        ref={playerRef}
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              controls: 1,
            },
          },
        }}
      />
    </Show>
  );
}
