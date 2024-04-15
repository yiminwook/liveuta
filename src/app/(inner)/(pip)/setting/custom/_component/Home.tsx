import * as styles from './home.css';
import Form from './Form';
import Background from '@inner/_component/Background';

export default function Home() {
  return (
    <Background>
      <div className={styles.inner}>
        <Form />
      </div>
    </Background>
  );
}
