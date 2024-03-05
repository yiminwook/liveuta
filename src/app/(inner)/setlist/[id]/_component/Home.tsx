import { getChannel, parseChannel } from '@/model/mongoDB/getAllChannel';
import { getSetlistByVideoId } from '@/model/oracleDB/setlist/service';
import { notFound, redirect } from 'next/navigation';
import Desc from './Desc';
import SetlistPlayer from './SetlistPlayer';
import * as styles from './home.css';
import Info from './Info';
import { auth } from '@/model/nextAuth';

interface HomeProps {
  params: {
    id: string;
  };
}

export default async function Home({ params }: HomeProps) {
  const session = await auth();
  const setlist = await getSetlistByVideoId(params.id);
  if (setlist === null) notFound();
  const document = await getChannel(setlist.channelId);
  const channel = parseChannel(document);

  return (
    <main id="app">
      <div className={styles.inner}>
        <section className={styles.left}>
          <div className={styles.playerWrap}>
            <SetlistPlayer videoId={setlist.videoId} />
          </div>
          <div className={styles.infoWrap}>
            <Info setlist={setlist} channel={channel} />
          </div>
        </section>
        <section className={styles.right}>
          <Desc session={session} videoId={setlist.videoId} description={setlist.description} />
        </section>
      </div>
    </main>
  );
}
