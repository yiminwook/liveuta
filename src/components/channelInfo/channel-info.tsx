'use client';
import useCachedData from '@/hooks/use-cached-data';
import useMutateWhitelist from '@/hooks/use-delete-whitelist';
import usePostWhitelist from '@/hooks/use-post-whitelist';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { TYChannelsData } from '@/types/api/youtube';
import { IconStarFilled } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import type { MouseEvent } from 'react';
import { Suspense } from 'react';
import { toast } from 'sonner';
import Show from '../common/utils/Show';
import ChannelDescription from './channel-description';
import css from './channel-info.module.scss';
import ProfileImage from './profile-image';

type ChannelInfoProps = {
  channel: TYChannelsData;
};

export default function ChannelInfo({ channel }: ChannelInfoProps) {
  const locale = useLocale();
  const { t } = useTranslations();

  const { data: session } = useSession();
  const { whiteListMap } = useCachedData({ session });
  const isFavorite = whiteListMap.has(channel.uid);

  const publishedAt = channel.snippet?.publishedAt
    ? new Date(channel.snippet.publishedAt).toLocaleDateString()
    : '';

  const channelUrl = `https://www.youtube.com/channel/${channel.uid}`;

  const mutatePostFavorite = usePostWhitelist();
  const mutateDeleteFavorite = useMutateWhitelist();

  const handleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!session) {
      toast.error(t('channelInfo.channelInfo.notLoggedInError'));
      return;
    }

    if (!isFavorite && confirm(t('channelInfo.channelInfo.addFavoriteChannel'))) {
      mutatePostFavorite.mutate({
        session,
        channelId: channel.uid,
      });
    } else if (isFavorite && confirm(t('channelInfo.channelInfo.removeFavoriteChannel'))) {
      mutateDeleteFavorite.mutate({
        session,
        channelId: channel.uid,
      });
    }
  };

  return (
    <div className={css.wrap}>
      <Suspense>
        <div className={css.header}>
          <div className={css.profileImage}>
            <a href={channelUrl} target="_blank" rel="noopener noreferrer">
              <ProfileImage src={channel.snippet?.thumbnails?.medium?.url ?? '/loading.png'} />
            </a>
          </div>
          <div className={css.headerInfo}>
            <div className={css.headerTitle}>
              <a href={channelUrl} target="_blank" rel="noopener noreferrer">
                <h1 className={css.channelName}>{channel.nameKor}</h1>
              </a>
              <button
                onClick={handleFavorite}
                disabled={mutatePostFavorite.isPending || mutateDeleteFavorite.isPending}
              >
                <IconStarFilled size="1.2rem" color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
              </button>
            </div>
            <div className={css.headerUrls}>
              <div>{channel.uid}</div>
              <Show when={typeof channel.snippet?.customUrl === 'string'}>
                <div>{channel.snippet?.customUrl}</div>
              </Show>
            </div>
            <div className={css.headerStats}>
              <div>
                {t('channelInfo.channelInfo.subscriber')} {channel.statistics?.subscriberCount ?? 0}
                명
              </div>
              <div>
                {t('channelInfo.channelInfo.video')} {channel.statistics?.videoCount ?? 0}개
              </div>
            </div>
            <div className={css.publishedAt}>채널 생성일 {publishedAt}</div>
          </div>
        </div>
        <div className={css.contents}>
          <ChannelDescription
            description={channel.snippet?.description ?? ''}
            featuredUrls={channel.brandingSettings?.channel?.featuredChannelsUrls ?? []}
          />
        </div>
      </Suspense>
    </div>
  );
}
