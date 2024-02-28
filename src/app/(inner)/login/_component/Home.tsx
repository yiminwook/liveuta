'use client';
import { signIn } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import * as styles from './home.css';
import { FcGoogle } from 'react-icons/fc';

export default function Home() {
  const { notification } = App.useApp();

  const mutateGoogleLogin = useMutation({
    mutationKey: ['login', 'google'],
    mutationFn: () => signIn('google', { callbackUrl: '/' }),
    onError: (error) =>
      notification.error({
        message: '로그인 실패',
        description: error.message,
      }),
  });

  return (
    <main id="app">
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <h1 className={styles.title}>로그인 Beta.</h1>
            <p>스타일은 계속 수정중입니다.</p>
            <br />
            <p>유저정보는 초기화 될 수 있습니다.</p>
          </div>
          <div className={styles.buttonBox}>
            <button
              className={styles.googleLoginButton}
              onClick={() => mutateGoogleLogin.mutate()}
              disabled={mutateGoogleLogin.isPending}
            >
              <FcGoogle size={28} />
              구글 계정으로 로그인
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
