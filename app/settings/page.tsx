'use client';
import { useAtomValue } from 'jotai';
import { tokenAtom, useTokenAtom } from '@/atoms';
import Settings from '@/components/settings/Settings.module.scss';
import CopyButton from '@/components/common/button/CopyButton';
import { toast } from 'react-toastify';
import FirebaseClient from '@/models/firebase/client';
import { getToken } from 'firebase/messaging';
import { useEffect, useState } from 'react';

const SettingsPage = () => {
  const [token, setToken] = useTokenAtom();
  const [permission, setPermission] = useState('설정을 가져오는 중');

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

  const requerstPermission = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        throw new Error('브라우저 알림허용 설정이 실패하였습니다.');
      }

      //허용후 등록
      const register = await navigator.serviceWorker.register('/sw.js');
      const messaging = FirebaseClient.getInstance().message;
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: register,
      });
      setPermission(() => permission);
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
        <div>{renderTokenBox()}</div>
      </div>
    </section>
  );
};
export default SettingsPage;
