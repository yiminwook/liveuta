'use client';
import { onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import FirebaseClient from '@/libraries/firebase/client';
import { generateFcmToken } from '@/libraries/firebase/generateFcmToken';

export default function ServiceWorker() {
  const handleMessage = async () => {
    try {
      const token = await generateFcmToken();

      if (token === undefined) {
        throw new Error('브라우저 알림허용 설정이 되어있지 않습니다.');
      }

      const messaging = FirebaseClient.getInstance().message;

      onMessage(messaging, ({ data }) => {
        if (data === undefined) return;

        const noti = new Notification(data.title!, {
          body: data.body,
          image: data.imageUrl!,
          timestamp: Number(data.timestamp),
        } as any);

        noti.onclick = () => {
          const url = window.location.href;
          if (url !== data.link) {
            window.open(data.link);
          }
          noti.close();
        };
      });
    } catch (error) {
      console.error('FCM: ', error);
    }
  };

  useEffect(() => {
    handleMessage();
  }, []);

  return <></>;
}
