import * as styles from './home.css';
import Form from './Form';
import Background from '@/components/common/Background';

export default function Home() {
  return (
    <Background>
      <div className={styles.inner}>
        <Form />
      </div>
    </Background>
  );
}
