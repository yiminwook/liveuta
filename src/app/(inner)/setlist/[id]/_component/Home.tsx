import { getChannel, parseChannel } from '@/model/mongoDB/getAllChannel';
import { getSetlistByVideoId } from '@/model/oracleDB/setlist/service';
import { notFound } from 'next/navigation';
import Desc from './Desc';
import SetlistPlayer from './SetlistPlayer';
import * as styles from './home.css';
import Info from './Info';
import { auth } from '@/model/nextAuth';
import character from '@/asset/image/character-5-150.png';
import Image from 'next/image';
import Background from '@inner/_component/Background';

interface HomeProps {
  params: {
    id: string;
  };
}

export default async function Home({ params }: HomeProps) {
  const session = await auth();
  const setlist = await getSetlistByVideoId(params.id);
  if (!setlist) notFound();
  const document = await getChannel(setlist.channelId);
  const channel = parseChannel(document);
  return (
    <Background>
      <div className={styles.inner}>
        <section className={styles.left}>
          <Image src={character} alt="캐릭터 이미지" width={150} height={224} unoptimized={true} />
          <div className={styles.playerWrap}>
            <SetlistPlayer videoId={setlist.videoId} />
          </div>
          <div className={styles.infoWrap}>
            <Info setlist={setlist} channel={channel} session={session} />
          </div>
        </section>
        <section className={styles.right}>
          <Desc session={session} videoId={setlist.videoId} description={setlist.description} />
        </section>
      </div>
    </Background>
  );
}
