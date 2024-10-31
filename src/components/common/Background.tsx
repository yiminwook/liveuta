import * as styles from './background.css';
import cx from 'classnames';

type BackgroundProps = {
  tile?: boolean;
  children: React.ReactNode;
};

export default function Background({ tile, children }: BackgroundProps) {
  return (
    <>
      <main className={cx(styles.main, tile && styles.background)}>{children}</main>
      <div className={styles.backgroundLeft} />
      <div className={styles.backgroundRight} />
    </>
  );
}
