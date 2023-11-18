'use client';
import { tokenAtom } from '@/atoms';
import Settings from '@/components/settings/Settings.module.scss';
import CopyButton from '@/components/common/button/CopyButton';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { generateFcmToken } from '@/models/firebase/generateFcmToken';
import { useAtomValue, useSetAtom } from 'jotai/esm/react';

const SettingsPage = () => {
  const setToken = useSetAtom(tokenAtom);
  const [permission, setPermission] = useState('설정을 가져오는 중');

  const requerstPermission = async () => {
    try {
      const token = await generateFcmToken();

      if (token === undefined) {
        throw new Error('브라우저 알림허용 설정이 되어있지 않습니다.');
      }

      setPermission(() => 'granted');
      setToken(() => token);
      toast.success('알림허용 설정이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Unknown Error';
      setPermission(() => 'denied');
      setToken(() => undefined);
      toast.error(message);
    }
  };

  useEffect(() => {
    setPermission(() => Notification.permission);
  }, []);

  return (
    <section className={Settings['section']}>
      <div className={Settings['permission-box']}>
        <div>
          알림허용설정 여부: <b>{permission}</b>
        </div>
        <button onClick={requerstPermission}>활성요청</button>
      </div>
      <div className={Settings['token-box']}>
        <label htmlFor="token">SW Token</label>
        <div>
          <TokenBox />
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;

const TokenBox = () => {
  const token = useAtomValue(tokenAtom);
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
