import Link from 'next/link';
import ThemeSelect from './ThemeSelect';
import * as styles from './home.css';

export default function Home() {
  return (
    <div className={styles.wrap}>
      <ThemeSelect />
      <div className={styles.linkBox}>
        <Link className={styles.customLink} href="/setting/custom">
          커스텀테마 작성하러가기
        </Link>
      </div>
    </div>
  );
}
