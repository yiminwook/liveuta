import { auth } from '@/model/nextAuth';
import { redirect } from 'next/navigation';
import * as styles from './home.css';
import dynamic from 'next/dynamic';
import { FaStar } from 'react-icons/fa6';
import { MdBlock } from 'react-icons/md';
import ListPlaceholder from './ListPlaceholder';

const Blacklist = dynamic(() => import('./Blacklist'), {
  ssr: false,
  loading: () => <ListPlaceholder />,
});
const Whitelist = dynamic(() => import('./Whitelist'), {
  ssr: false,
  loading: () => <ListPlaceholder />,
});

export default async function Home() {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className={styles.wrap}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FaStar size="1.2rem" color="#ffbb00" />
          <b>즐겨찾기</b>
        </h2>
        <Whitelist session={session} />
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <MdBlock size="1.2rem" />
          <b>블랙리스트</b>
        </h2>
        <Blacklist session={session} />
      </section>
    </div>
  );
}
