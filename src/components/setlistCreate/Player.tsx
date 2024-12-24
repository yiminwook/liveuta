'use client';
import Show from '@/components/common/utils/Show';
import ReactPlayer from 'react-player';
import { useSetlistStore } from './Context';
import css from './Player.module.scss';

export default function Player() {
  const url = useSetlistStore((state) => state.url);
  const playerRef = useSetlistStore((state) => state.playerRef);
  const initialPlay = useSetlistStore((state) => state.playerReady);
  const onInitialPlay = useSetlistStore((state) => state.onPlayerReady);

  const onReady = () => {
    if (initialPlay) {
      return;
    }

    onInitialPlay();
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
