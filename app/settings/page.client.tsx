'use client';
import Settings from '@/components/settings/Settings.module.scss';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { generateFcmToken } from '@/models/firebase/generateFcmToken';
import PostBox from '@/components/settings/PostBox';
import TokenBox from '@/components/settings/TokenBox';
import { TokenType } from '@/types';

const SettingsPage = () => {
  const [token, setToken] = useState<TokenType>(null);
  const [permission, setPermission] = useState('설정을 가져오는 중');

  const handleSetToken = async () => {
    try {
      const token = await generateFcmToken();

      if (token === undefined) {
        throw new Error('브라우저 알림허용 설정이 되어있지 않습니다.');
      }
      setPermission(() => 'granted');
      setToken(() => token);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Unknown Error';
      setPermission(() => 'denied');
      setToken(() => undefined);
      toast.error(message);
    }
  };

  const requerstPermission = async () => {
    handleSetToken().then(() => {
      toast.success('알림허용 설정이 완료되었습니다.');
    });
  };

  useEffect(() => {
    setPermission(() => {
      try {
        return Notification.permission;
      } catch (error) {
        console.error(error);
        return 'denied';
      }
    });

    handleSetToken();
  }, []);

  return (
    <section className={Settings['section']}>
      <div className={Settings['permission-box']}>
        <div>
          알림허용설정 여부: <b>{permission}</b>
        </div>
        <button onClick={requerstPermission}>요청</button>
      </div>
      <div className={Settings['token-box']}>
        <label htmlFor="token">SW Token</label>
        <div>
          <TokenBox token={token} />
        </div>
      </div>
      <PostBox token={token} />
    </section>
  );
};

export default SettingsPage;
