'use client';
import Link from 'next/link';
import SearchForm from './SearchForm';
import List from './List';
import * as styles from './home.css';

interface HomeProps {
  searchParams: {
    query?: string;
    page?: number;
  };
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <main id="app">
      <div className={styles.inner}>
        <section className={styles.top}>
          <h1 className={styles.title}>세트리 검색 Beta.</h1>
          <p>테스트 중입니다. 작성된 세트리가 지워질 수 있으니</p>
          <p>열심히 올리지 말아주세요</p>
        </section>
        <section className={styles.bottom}>
          <div className={styles.inputArea}>
            <div>
              <SearchForm searchParams={searchParams} />
            </div>
            <div className={styles.postLinkBox}>
              <Link href="/setlist/post">작성하러 가기</Link>
            </div>
          </div>
          <div>
            <List searchParams={searchParams} />
          </div>
        </section>
      </div>
    </main>
  );
}
