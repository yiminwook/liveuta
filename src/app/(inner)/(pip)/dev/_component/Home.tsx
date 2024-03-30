'use client';
import { useEffect, useState } from 'react';
import { generateFcmToken } from '@/model/firebase/generateFcmToken';
import PostBox from '@inner/(pip)/dev/_component/PostBox';
import TokenBox from '@inner/(pip)/dev/_component/TokenBox';
import { TokenType } from '@/type';
import { toast } from 'sonner';
import * as styles from './home.css';
import cx from 'classnames';

export default function Home() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={styles.wrap}>
        <div className={cx(styles.box, styles.permissionBox)}>
          <div>
            알림허용설정 여부: <b>{permission}</b>
          </div>
          <button className={styles.button} onClick={requerstPermission}>
            요청
          </button>
        </div>
        <div className={cx(styles.box)}>
          <label className={styles.tokenLabel} htmlFor="token">
            SW Token
          </label>
          <div className={styles.tokenBox}>
            <TokenBox token={token} />
          </div>
        </div>
        <PostBox token={token} />
      </section>
    </>
  );
}
