'use client';

import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { notification } = App.useApp();
  const router = useRouter();

  const mutateGoogleLogin = useMutation({
    mutationKey: ['login', 'google'],
    mutationFn: () => axios.get<{ url: string }>('/api/auth/google'),
    onSuccess: (res) => (window.location.href = res.data.url),
    onError: (error) =>
      notification.error({
        message: '로그인 실패',
        description: error.message,
      }),
  });

  return (
    <div>
      <h1>로그인</h1>
      <button onClick={() => mutateGoogleLogin.mutate()}>로그인</button>
      <button onClick={() => router.push('/sessionout')}>세션아웃 페이지</button>
    </div>
  );
}
