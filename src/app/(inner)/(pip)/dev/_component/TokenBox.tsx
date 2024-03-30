'use client';
import { TokenType } from '@/type';
import CopyButton from '@inner/_component/button/CopyButton';
import * as styles from './home.css';

export default function TokenBox({ token }: { token: TokenType }) {
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
