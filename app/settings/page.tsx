'use client';
import { useAtomValue } from 'jotai';
import { tokenAtom } from '@/atoms';
import Settings from '@/components/settings/Settings.module.scss';
import CopyButton from '@/components/common/button/CopyButton';

const SettingsPage = () => {
  const token = useAtomValue(tokenAtom);

  const renderTokenBox = () => {
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

  return (
    <section className={Settings['section']}>
      <div className={Settings['token-box']}>
        <label htmlFor="token">SW Token</label>
        <div>{renderTokenBox()}</div>
      </div>
    </section>
  );
};
export default SettingsPage;
