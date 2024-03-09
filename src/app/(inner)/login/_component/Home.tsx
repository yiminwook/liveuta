'use client';
import { signIn } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import * as styles from './home.css';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { Provider } from '@/type/nextAuth';
import { FaDiscord } from 'react-icons/fa';
import { toast } from 'sonner';
import Image from 'next/image';
import character from '@/asset/image/character-3.png';

export default function Home() {
  const mutateLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: (provider: Provider) => signIn(provider, { callbackUrl: '/' }),
    onError: (error) => toast.error(error.message),
  });

  return (
    <div className={styles.wrap}>
      <h1 className="blind">로그인 페이지</h1>
      <div className={styles.inner}>
        <div className={styles.imgBox}>
          <Image src={character} width={200} height={300} alt="로그인 이미지" unoptimized={true} />
        </div>
        <p>소셜 계정으로 시작</p>
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
  );
}
