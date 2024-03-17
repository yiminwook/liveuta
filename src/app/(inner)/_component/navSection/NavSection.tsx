import NavSelectBox from './NavSelectBox';
import NavTab from './NavTab';
import * as styles from './navSection.css';

export default function NavSection() {
  return (
    <section className={styles.navSection}>
      <NavTab />
      <NavSelectBox />
    </section>
  );
}
