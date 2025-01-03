'use client';
import Background from '@/components/common/background/Background';
import PostBox from '@/components/dev/PostBox';
import TokenBox from '@/components/dev/TokenBox';
import { generateFcmToken } from '@/libraries/firebase/generateFcmToken';
import { TToken } from '@/types';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import MainLoading from '../common/loading/MainLoading';
import css from './Home.module.scss';

export default function Home() {
  const [token, setToken] = useState<TToken>(null);
  const [permission, setPermission] = useState('설정을 가져오는 중');

  const handleSetToken = async () => {
    try {
      const token = await generateFcmToken();

      if (token === undefined) {
        throw new Error('브라우저 알림허용 설정이 되어있지 않습니다.');
      }
      setPermission(() => 'granted');
      setToken(() => token);
      return true;
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Unknown Error';
      setPermission(() => 'denied');
      setToken(() => undefined);
      toast.error(message);
      return false;
    }
  };

  const requerstPermission = async () => {
    const result = await handleSetToken();
    if (result) {
      toast.success('알림허용 설정이 완료되었습니다.');
    }
  };

  useEffect(() => {
    setPermission(() => {
      try {
        // ios에서 Notification에 접근하면 에러발생
        return Notification.permission;
      } catch (error) {
        console.error(error);
        return 'denied';
      }
    });

    handleSetToken();
  }, []);

  return (
    <Background>
      <section className={css.wrap}>
        <div className={cx(css.box, css.permissionBox)}>
          <div>
            알림허용설정 여부: <b>{permission}</b>
          </div>
          <button className={css.button} data-variant="request" onClick={requerstPermission}>
            요청
          </button>
        </div>
        <div className={cx(css.box)}>
          <label className={css.tokenLabel} htmlFor="token">
            SW Token
          </label>
          <div className={css.tokenBox}>
            <TokenBox token={token} />
          </div>
        </div>
        <PostBox token={token} />
      </section>
    </Background>
  );
}
