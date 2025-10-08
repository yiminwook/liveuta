'use client';
import clsx from 'clsx';
import ReactPlayer from 'react-player';
import { toast } from 'sonner';
import { ORIGIN } from '@/constants';
import { useTranslations } from '@/libraries/i18n/client';

type Props = {
  url: string;
};

export default function GridPlayer({ url }: Props) {
  const { t } = useTranslations();

  return (
    <ReactPlayer
      className={clsx('no-drag')}
      width="100%"
      height="100%"
      style={{ overflow: 'hidden' }}
      url={url}
      config={{
        youtube: {
          playerVars: {
            origin: ORIGIN,
          },
        },
      }}
      controls={true}
      onError={() => {
        toast.error(t('multiView.3002'));
        // setVideoId(() => IINITIAL_PLAYER_VIDEO_ID);
        // setStatus((pre) => ({ ...pre, isPlaying: false }));
      }}
    />
  );
}
