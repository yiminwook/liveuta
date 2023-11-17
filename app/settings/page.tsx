'use client';

import { useAtomValue } from 'jotai';
import { tokenAtom } from '@/atoms';
import Settings from '@/components/settings/Settings.module.scss';
import CopyButton from '@/components/common/button/CopyButton';

const SettingsPage = () => {
  const token = useAtomValue(tokenAtom);
  return (
    <section className={Settings['section']}>
      <div className={Settings['token-box']}>
        <label htmlFor="token">SW Token</label>
        <div>
          {token !== '' ? (
            <>
              <div id={Settings['token']}>{token}</div>
              <CopyButton value={token} size={'1.5rem'} />
            </>
          ) : (
            <div>토큰을 가져오고 있습니다.</div>
          )}
        </div>
      </div>
    </section>
  );
};
export default SettingsPage;
