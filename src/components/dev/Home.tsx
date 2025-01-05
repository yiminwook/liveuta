'use client';
import Background from '@/components/common/background/Background';
import PostBox from '@/components/dev/PostBox';
import TokenBox from '@/components/dev/TokenBox';
import { generateFcmToken } from '@/libraries/firebase/generateFcmToken';
import { TToken } from '@/types';
import cx from 'classnames';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import css from './Home.module.scss';

export default function Home() {
  const t = useTranslations('dev');
  const [token, setToken] = useState<TToken>(null);
  const [permission, setPermission] = useState(t('initialPermission'));

  const handleSetToken = async () => {
    try {
      const token = await generateFcmToken();

      if (token === undefined) {
        throw new Error(t('noBrowserNotificationError'));
      }
      setPermission(() => t('permissionGranted'));
      setToken(() => token);
      return true;
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Unknown Error';
      setPermission(() => t('permissionDenied'));
      setToken(() => undefined);
      toast.error(message);
      return false;
    }
  };

  const requerstPermission = async () => {
    const result = await handleSetToken();
    if (result) {
      toast.success(t('browserNotificationAllowed'));
    }
  };

  useEffect(() => {
    setPermission(() => {
      try {
        // ios에서 Notification에 접근하면 에러발생
        return Notification.permission;
      } catch (error) {
        console.error(error);
        return t('permissionDenied');
      }
    });

    handleSetToken();
  }, []);

  return (
    <Background>
      <section className={css.wrap}>
        <div className={cx(css.box, css.permissionBox)}>
          <div>
            {t('browserNotification')}: <b>{permission}</b>
          </div>
          <button className={css.button} data-variant="request" onClick={requerstPermission}>
            {t('request')}
          </button>
        </div>
        <div className={cx(css.box)}>
          <label className={css.tokenLabel} htmlFor="token">
            {t('token')}
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
