'use client';
import useToast from '@/hook/useToast';
import clientOnly from '@/model/clientOnly';
import FirebaseClient from '@/model/firebase/client';
import { generateFcmToken } from '@/model/firebase/generateFcmToken';
import { TokenType } from '@/type';
import { onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';

export default clientOnly(function ServiceWorker() {
  const [token, setToken] = useState<TokenType>(null);
  const [permission, setPermission] = useState('설정을 가져오는 중');

  const toast = useToast();

  const handleMessage = async () => {
    try {
      const token = await generateFcmToken();

      if (token === undefined) {
        throw new Error('브라우저 알림허용 설정이 되어있지 않습니다.');
      }

      alert(token);

      setPermission(() => 'granted');
      setToken(() => token);

      const messaging = FirebaseClient.getInstance().message;
      onMessage(messaging, ({ data, from, collapseKey, messageId }) => {
        if (data === undefined) return;

        const noti = new Notification(data.title!, {
          body: data.body,
          image: data.imageUrl!,
          timestamp: Number(data.timestamp),
        });

        noti.onclick = () => {
          const url = window.location.href;
          if (url !== data.link) {
            window.open(data.link);
          }
          noti.close();
        };
      });

      return true;
    } catch (error) {
      console.error('handleMessage', error);
      const message = error instanceof Error ? error.message : 'Unknown Error';
      setPermission(() => 'denied');
      setToken(() => undefined);
      toast.error({ text: message });

      return false;
    }
  };

  useEffect(() => {
    setPermission(() => {
      try {
        // ios에서 Notification에 접근하면 에러발생
        return Notification.permission;
      } catch (error) {
        console.error('setPermission', error);
        return 'denied';
      }
    });

    handleMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
});
