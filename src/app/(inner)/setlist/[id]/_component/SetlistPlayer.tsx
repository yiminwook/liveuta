'use client';
import PlayerPlaceholder from '@inner/_component/player/PlayerPlaceholder';
import { player } from '@inner/_lib/atom';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useLayoutEffect } from 'react';

const Player = dynamic(() => import('@inner/_component/player/Player'), {
  ssr: false,
  loading: () => <PlayerPlaceholder />,
});

interface PlayerWrapProps {
  videoId: string;
}

export default function SetlistPlayer({ videoId }: PlayerWrapProps) {
  const [, setPlayer] = useAtom(player.playerVideoIdAtom);

  useLayoutEffect(() => {
    setPlayer(() => videoId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Player isLive={false} isShow={true} />
    </div>
  );
}
