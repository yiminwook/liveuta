'use client';
import Settings from '@/components/settings/Settings.module.scss';
import CopyButton from '@/components/common/button/CopyButton';
import { TokenType } from '@/app/settings/page';

const TokenBox = ({ token }: { token: TokenType }) => {
  switch (token) {
    case null:
      return <div>토큰을 가져오는 중입니다.</div>;
    case undefined:
      return <div>토큰을 가져오는데 실패했습니다.</div>;
    default:
      return (
        <>
          <div id={Settings['token']}>{token}</div>
          <CopyButton value={token!} size={'1.5rem'} />
        </>
      );
  }
};

export default TokenBox;
