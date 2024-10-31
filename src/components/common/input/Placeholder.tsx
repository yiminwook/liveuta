'use client';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as styles from './placeholder.css';

type PlaceHolderProps = {
  height: string;
};

export default function PlaceHolder({ height }: PlaceHolderProps) {
  return (
    <div className={styles.bg} style={assignInlineVars(styles.placeholderContract, { height })} />
  );
}
