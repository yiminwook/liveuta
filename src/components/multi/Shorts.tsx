'use client';
import { ORIGIN } from '@/constants';
import ReactPlayer from 'react-player';
import { toast } from 'sonner';

type ShortsProps = {
  url: string;
};

export default function Shorts({ url }: ShortsProps) {
  return (
    <ReactPlayer
      width="100%"
      height="100%"
      url={url}
      config={{
        youtube: {
          playerVars: {
            suggestedQuality: 'hd720',
            origin: ORIGIN,
          },
        },
      }}
      controls={true}
      onError={() => {
        toast.error('실행 할 수 없는 영상입니다.');
        // setVideoId(() => IINITIAL_PLAYER_VIDEO_ID);
        // setStatus((pre) => ({ ...pre, isPlaying: false }));
      }}
    />
  );
}
