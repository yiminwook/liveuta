'use client';
import Show from '@/components/common/utils/Show';
import ReactPlayer from 'react-player';
import { usePlayerStore } from './Context';
import css from './Player.module.scss';

export default function Player() {
  const url = usePlayerStore((state) => state.url);
  const playerRef = usePlayerStore((state) => state.playerRef);
  const initialPlay = usePlayerStore((state) => state.playerReady);
  const { onPlayerReady } = usePlayerStore((state) => state.actions);

  const onReady = () => {
    if (initialPlay) {
      return;
    }

    onPlayerReady();
  };

  return (
    <Show when={url !== ''} fallback={<div className={css.player}>Hello</div>}>
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
