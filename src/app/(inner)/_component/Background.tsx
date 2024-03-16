'use client';
import { PropsWithChildren } from 'react';
import * as styles from '../layout.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import cx from 'classnames';

const PATH = ['(pip)', '/live', '/all', '/daily'];

export default function Background({ children }: PropsWithChildren) {
  const segment = useSelectedLayoutSegment() || '';

  const isPath = PATH.includes(segment);

  return (
    <>
      <main className={cx(styles.main, isPath && styles.background)}>{children}</main>
      <div className={styles.backgroundLeft} />
      <div className={styles.backgroundRight} />
    </>
  );
}
