import { serverApi } from '@/apis/fetcher';
import { TYChannelsData } from '@/types/api/youtube';
import ChannelInfo from './channel-info';
import css from './home.module.scss';

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

  return (
    <div className={css.wrap}>
      <ChannelInfo channel={channel} />
    </div>
  );
}
