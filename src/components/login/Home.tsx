'use client';
import character from '@/assets/image/character-3.png';
import Background from '@/components/common/Background';
import { Provider } from '@/types/nextAuth';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { FaDiscord } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { toast } from 'sonner';
import css from './Home.module.scss';

export default function Home() {
  const mutateLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: (provider: Provider) => signIn(provider, { callbackUrl: '/' }),
    onError: (error) => toast.error(error.message),
  });

  return (
    <Background>
      <div className={css.wrap}>
        <h1 className="blind">로그인 페이지</h1>
        <div className={css.inner}>
          <div className={css.imgBox}>
            <Image
              src={character}
              width={200}
              height={300}
              alt="로그인 이미지"
              unoptimized={true}
            />
          </div>
          <p>소셜 계정으로 시작</p>
          <div className={css.buttonBox}>
            <button
              className={css.socialLoginButton}
              onClick={() => mutateLogin.mutate('google')}
              disabled={mutateLogin.isPending}
            >
              <FcGoogle size={28} />
            </button>
            <button
              className={css.socialLoginButton}
              onClick={() => mutateLogin.mutate('kakao')}
              disabled={mutateLogin.isPending}
            >
              <RiKakaoTalkFill size={28} />
            </button>
            <button
              className={css.socialLoginButton}
              onClick={() => mutateLogin.mutate('discord')}
              disabled={mutateLogin.isPending}
            >
              <FaDiscord size={28} />
            </button>
          </div>
        </div>
      </div>
    </Background>
  );
}
