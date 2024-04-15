import { Session } from '@auth/core/types';
import PostForm from './PostForm';
import * as styles from './home.css';
import Link from 'next/link';
import Background from '@inner/_component/Background';

type HomeProps = {
  session: Session;
};

export default function Home({ session }: HomeProps) {
  return (
    <Background>
      <h1 className="blind">세트리 추가</h1>
      <div className={styles.inner}>
        <div>
          <div className={styles.formBox}>
            <div className={styles.desc}>
              <div className={styles.formHeader}>
                <div className={styles.headerPlaceholder} />
                <h2 className={styles.descTitle}>세트리를 등록하세요</h2>
                <Link className={styles.backLink} href="/setlist">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style={{ width: '1.8rem', height: '1.8rem' }}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 12H8" />
                    <path d="m12 8-4 4 4 4" />
                  </svg>
                </Link>
              </div>
              <div>
                <a
                  className={styles.utaToolsLink}
                  href="https://uta-tools.vercel.app/tools/youtube/timeline"
                >
                  우타툴즈 타임라인으로 이동
                </a>
              </div>
            </div>
            <PostForm session={session} />
          </div>
        </div>
      </div>
    </Background>
  );
}
