import ThemeSelect from './ThemeSelect';
import * as styles from './home.css';
import Background from '@/components/common/Background';

export default function Home() {
  return (
    <Background>
      <div className={styles.wrap}>
        <ThemeSelect />
      </div>
    </Background>
  );
}
