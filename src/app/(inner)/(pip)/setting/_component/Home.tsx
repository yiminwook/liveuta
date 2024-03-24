import ThemeSelect from './ThemeSelect';
import * as styles from './home.css';

export default function Home() {
  return (
    <div className={styles.wrap}>
      <ThemeSelect />
      <div>준비중...</div>
    </div>
  );
}
