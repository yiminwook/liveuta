import Nav from './Nav';
import ShortsSection from './ShortsSection';
import * as styles from './home.css';

export default async function Home() {
  return (
    <div className={styles.wrap}>
      <Nav />
      <ShortsSection />
    </div>
  );
}
