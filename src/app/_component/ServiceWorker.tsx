'use client';
import FirebaseClient from '@/model/firebase/client';
import { generateFcmToken } from '@/model/firebase/generateFcmToken';
import { onMessage } from 'firebase/messaging';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ServiceWorker() {
  const router = useRouter();
  const [load, setLoad] = useState(false);

  const handleMessage = async () => {
    try {
      console.log('req');
      const token = await generateFcmToken();

      if (token === undefined) {
        throw new Error('브라우저 알림허용 설정이 되어있지 않습니다.');
      }

      alert(token);

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
    } catch (error) {
      console.error('handleMessage', error);
      alert(error);
    }
  };

  useEffect(() => {
    if (!load) {
      console.log('load');
      router.refresh();
      return setLoad(() => true);
    }
    handleMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return <></>;
}
