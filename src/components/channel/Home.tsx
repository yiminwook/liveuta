import Background from '@/components/common/background/Background';
import { ITEMS_PER_PAGE } from '@/constants';
import { TChannelDto, TYChannelReturn } from '@/libraries/mongoDB/getAllChannel';
import { auth } from '@/libraries/nextAuth';
import ChannelSection from './ChannelSection';
import css from './Home.module.scss';
import Nav from './Nav';
import PaginationBox from './PaginationBox';

type HomeProps = {
  channelDto: TChannelDto;
};

export default async function Home({ channelDto }: HomeProps) {
  const [session, YChannelData] = await Promise.all([
    auth(),
    fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/youtube-channel?page=${channelDto.page}&query=${channelDto.query || ''}&size=${ITEMS_PER_PAGE}&sort=${channelDto.sort}`,
      { next: { revalidate: 1800, tags: ['channel'] } },
    )
      .then((res) => res.json() as Promise<{ data: TYChannelReturn }>)
      .then((json) => json.data),
  ]);

  return (
    <Background>
      <div className={css.inner}>
        <Nav />
        <ChannelSection contents={YChannelData.contents} session={session} />
        <PaginationBox
          totalPage={YChannelData.totalPage}
          currentPage={channelDto.page}
          query={channelDto.query || ''}
        />
      </div>
    </Background>
  );
}
