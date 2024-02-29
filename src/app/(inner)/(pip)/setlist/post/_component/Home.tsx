import { Session } from '@auth/core/types';
import PostForm from './PostForm';
import * as styles from './home.css';
import Link from 'next/link';

interface HomeProps {
  session: Session;
}

export default function Home({ session }: HomeProps) {
  return (
    <main id="app">
      <div className={styles.inner}>
        <h1 className={styles.title}>세트리 추가 Beta.</h1>
        <div>
          <div className={styles.formBox}>
            <div className={styles.desc}>
              <a
                className={styles.utaToolsLink}
                href="https://uta-tools.vercel.app/tools/youtube/timeline"
              >
                우타툴즈 타임라인으로 이동
              </a>
              <p>우타툴즈에서 작성된 세트리를 등록하세요</p>
              <Link href="/setlist">조회페이지로 이동</Link>
            </div>
            <PostForm session={session} />
          </div>
        </div>
      </div>
    </main>
  );
}
