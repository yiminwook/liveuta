import Link from 'next/link';
import ThemeSelect from './ThemeSelect';
import * as styles from './home.css';
import Background from '@inner/_component/Background';

export default function Home() {
  return (
    <Background>
      <div className={styles.wrap}>
        <ThemeSelect />
      </div>
    </Background>
  );
}
