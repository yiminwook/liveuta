'use client';
import * as styles from './home.css';
import dynamic from 'next/dynamic';
import { FaStar } from 'react-icons/fa6';
import { MdBlock } from 'react-icons/md';
import ListPlaceholder from './ListPlaceholder';
import Background from '@/components/common/Background';
import useCachedData from '@/hooks/useCachedData';
import { Session } from 'next-auth';

const Blacklist = dynamic(() => import('./Blacklist'), {
  ssr: false,
  loading: () => <ListPlaceholder />,
});
const Whitelist = dynamic(() => import('./Whitelist'), {
  ssr: false,
  loading: () => <ListPlaceholder />,
});

type HomeProps = {
  session: Session;
};

export default function Home({ session }: HomeProps) {
  const { whiteList, channelList, blackList } = useCachedData({ session });

  return (
    <Background>
      <div className={styles.wrap}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FaStar size="1.2rem" color="#ffbb00" />
            <b>즐겨찾기</b>
          </h2>
          <Whitelist session={session} whiteList={whiteList} channelList={channelList} />
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <MdBlock size="1.2rem" />
            <b>블랙리스트</b>
          </h2>
          <Blacklist session={session} blacklist={blackList} channelList={channelList} />
        </section>
      </div>
    </Background>
  );
}
