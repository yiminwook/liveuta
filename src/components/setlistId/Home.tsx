import character from '@/assets/image/character-5-150.png';
import { getChannelById, parseChannel } from '@/libraries/mongoDB/channels';
import { getSetlistByVideoId } from '@/libraries/oracleDB/setlist/service';
import { Divider } from '@mantine/core';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Background from '../common/background/Background';
import Desc from './Desc';
import css from './Home.module.scss';
import Info from './Info';
import SetlistPlayer from './SetlistPlayer';

interface HomeProps {
  params: {
    id: string;
  };
}

export default async function Home({ params }: HomeProps) {
  const data = await getSetlistByVideoId(params.id);
  if (!data) notFound();
  const setlist = data.setlist;
  const icon = data.channelIcon;
  const document = await getChannelById(setlist.channelId);
  const channel = parseChannel(document);
  return (
    <Background>
      <div className={css.inner}>
        <section className={css.left}>
          <Image
            className={css.character}
            src={character}
            alt="캐릭터 이미지"
            width={150}
            height={224}
            unoptimized={true}
          />
          <div className={css.playerWrap}>
            <SetlistPlayer videoId={setlist.videoId} />
          </div>
          <div className={css.infoWrap}>
            <Info setlist={setlist} channel={channel} icon={icon} />
          </div>
        </section>
        <Divider className={css.divider} orientation="horizontal" />
        <section className={css.right}>
          <Desc videoId={setlist.videoId} description={setlist.description} />
        </section>
      </div>
    </Background>
  );
}
