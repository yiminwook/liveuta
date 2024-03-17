'use client';
import { PropsWithChildren } from 'react';
import * as styles from '../layout.css';
import { useSelectedLayoutSegments } from 'next/navigation';
import cx from 'classnames';

const PATH = ['(pip)', 'live'];

export default function Background({ children }: PropsWithChildren) {
  const lastPath = useSelectedLayoutSegments().at(-1) || '(pip)';
  const isPath = PATH.includes(lastPath);

  return (
    <>
      <main className={cx(styles.main, isPath && styles.background)}>{children}</main>
      <div className={styles.backgroundLeft} />
      <div className={styles.backgroundRight} />
    </>
  );
}
