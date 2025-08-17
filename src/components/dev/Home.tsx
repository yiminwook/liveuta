'use client';
import Background from '@/components/common/background/Background';
import PostBox from '@/components/dev/PostBox';
import TokenBox from '@/components/dev/TokenBox';
import { generateFcmToken } from '@/libraries/firebase/generateFcmToken';
import { useTranslations } from '@/libraries/i18n/client';
import { TToken } from '@/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import css from './Home.module.scss';

export default function Home() {
  const { t } = useTranslations();
  const [token, setToken] = useState<TToken>(null);
  const [permission, setPermission] = useState(t('dev.initialPermission'));

  const handleSetToken = async () => {
    try {
      const token = await generateFcmToken();

      if (token === undefined) {
        throw new Error(t('dev.noBrowserNotificationError'));
      }
      setPermission(() => t('dev.permissionGranted'));
      setToken(() => token);
      return true;
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Unknown Error';
      setPermission(() => t('dev.permissionDenied'));
      setToken(() => undefined);
      toast.error(message);
      return false;
    }
  };

  const requerstPermission = async () => {
    const result = await handleSetToken();
    if (result) {
      toast.success(t('dev.browserNotificationAllowed'));
    }
  };

  useEffect(() => {
    setPermission(() => {
      try {
        // ios에서 Notification에 접근하면 에러발생
        return Notification.permission;
      } catch (error) {
        console.error(error);
        return t('dev.permissionDenied');
      }
    });

    handleSetToken();
  }, []);

  return (
    <Background>
      <section className={css.wrap}>
        <div className={clsx(css.box, css.permissionBox)}>
          <div>
            {t('dev.browserNotification')}: <b>{permission}</b>
          </div>
          <button className={css.button} data-variant="request" onClick={requerstPermission}>
            {t('dev.request')}
          </button>
        </div>
        <div className={clsx(css.box)}>
          <label className={css.tokenLabel} htmlFor="token">
            {t('dev.token')}
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
