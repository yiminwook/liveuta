'use client';
import { signIn } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import * as styles from './home.css';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { Provider } from '@/type/nextAuth';
import { FaDiscord } from 'react-icons/fa';

export default function Home() {
  const { notification } = App.useApp();

  const mutateLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: (provider: Provider) => signIn(provider, { callbackUrl: '/' }),
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
            <br />
            <p>유저정보는 초기화 될 수 있습니다.</p>
            <p>페이지가 정상적으로 작동되지 않을시</p>
            <p>쿠키를 삭제 해주세요</p>
          </div>
          <div className={styles.bottom}>
            <p>Log in with your social account</p>
            <div className={styles.buttonBox}>
              <button
                className={styles.googleLoginButton}
                onClick={() => mutateLogin.mutate('google')}
                disabled={mutateLogin.isPending}
              >
                <FcGoogle size={28} />
              </button>
              <button
                className={styles.googleLoginButton}
                onClick={() => mutateLogin.mutate('kakao')}
                disabled={mutateLogin.isPending}
              >
                <RiKakaoTalkFill size={28} />
              </button>
              <button
                className={styles.googleLoginButton}
                onClick={() => mutateLogin.mutate('discord')}
                disabled={mutateLogin.isPending}
              >
                <FaDiscord size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
