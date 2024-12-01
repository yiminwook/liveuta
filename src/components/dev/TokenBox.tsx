'use client';
import { TToken } from '@/types';
import CopyButton from '@/components/common/button/CopyButton';
import * as styles from './home.css';

export default function TokenBox({ token }: { token: TToken }) {
  switch (typeof token) {
    case 'string':
      return (
        <>
          <div className={styles.token}>{token}</div>
          <CopyButton value={token!} size={'1.5rem'} />
        </>
      );
    case 'undefined':
      return <div>토큰을 가져오는데 실패했습니다.</div>;
    default:
      return <div>토큰을 가져오는 중입니다.</div>;
  }
}
