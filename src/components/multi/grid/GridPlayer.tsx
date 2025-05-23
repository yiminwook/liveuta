'use client';
import { ORIGIN } from '@/constants';
import { useTranslations } from '@/libraries/i18n/client';
import classNames from 'classnames';
import ReactPlayer from 'react-player';
import { toast } from 'sonner';

type Props = {
  url: string;
};

export default function GridPlayer({ url }: Props) {
  const { t } = useTranslations();

  return (
    <ReactPlayer
      className={classNames('no-drag')}
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
        toast.error(t('multiView.cannotPlayError'));
        // setVideoId(() => IINITIAL_PLAYER_VIDEO_ID);
        // setStatus((pre) => ({ ...pre, isPlaying: false }));
      }}
    />
  );
}
