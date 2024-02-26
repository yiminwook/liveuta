'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const route = useRouter();

  useEffect(() => {
    // 세션에서 에러발생시 로그아웃 처리
    axios({
      method: 'POST',
      url: '/api/auth/logout',
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        return setTimeout(() => {
          route.refresh();
        }, 1000);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
