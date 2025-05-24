import { serverApi } from '@/apis/fetcher';
import { CHANNEL_TAG } from '@/constants/revalidate-tag';
import { TYChannelsData } from '@/types/api/youtube';
import { Anchor } from '@mantine/core';
import { Suspense } from 'react';
import Show from '../common/utils/Show';
import ChannelDescription from './channel-description';
import css from './home.module.scss';
import ProfileImage from './profile-image';

type HomeProps = {
  channelId: string;
};

export default async function Home({ channelId }: HomeProps) {
  const channel = await serverApi
    .get<{ data: TYChannelsData }>(`v1/youtube-channel/${channelId}`, {
      // next: { revalidate: 1800, tags: [channelId] },
    })
    .json()
    .then((json) => json.data);

  const publishedAt = channel.snippet?.publishedAt
    ? new Date(channel.snippet.publishedAt).toLocaleDateString()
    : '';

  return (
    <div className={css.wrap}>
      {/* <div>{JSON.stringify(channel, null, 2)}</div> */}
      <Suspense>
        <div className={css.header}>
          <div className={css.profileImage}>
            <ProfileImage url={channel.snippet?.thumbnails?.medium?.url ?? '/loading.png'} />
          </div>
          <div className={css.headerInfo}>
            <h1 className={css.channelName}>{channel.nameKor}</h1>
            <div className={css.headerUrls}>
              <div>
                <Anchor
                  href={`https://www.youtube.com/channel/${channel.uid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {channel.uid}
                </Anchor>
              </div>
              <Show when={typeof channel.snippet?.customUrl === 'string'}>
                <div>
                  <Anchor
                    href={`https://www.youtube.com/${channel.snippet?.customUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {channel.snippet?.customUrl}
                  </Anchor>
                </div>
              </Show>
            </div>
            <div className={css.headerStats}>
              <div>구독자 {channel.statistics?.subscriberCount ?? 0}명</div>
              <div>동영상 {channel.statistics?.videoCount ?? 0}개</div>
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
