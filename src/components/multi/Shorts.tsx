'use client';
import { ORIGIN } from '@/constants';
import { useTranslations } from 'next-intl';
import ReactPlayer from 'react-player';
import { toast } from 'sonner';

type ShortsProps = {
  url: string;
};

export default function Shorts({ url }: ShortsProps) {
  const t = useTranslations('multiView.shortsSection.shorts');

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
        toast.error(t('cannotPlayError'));
        // setVideoId(() => IINITIAL_PLAYER_VIDEO_ID);
        // setStatus((pre) => ({ ...pre, isPlaying: false }));
      }}
    />
  );
}
