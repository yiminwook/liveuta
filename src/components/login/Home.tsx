'use client';
import character from '@/assets/image/character-3.png';
import { Provider } from '@/types/nextAuth';
import { ActionIcon } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'sonner';
import LogosDiscordIcon from '~icons/logos/discord-icon.jsx';
import LogosGoogleIcon from '~icons/logos/google-icon.jsx';
import RiKakaoTalkFill from '~icons/ri/kakao-talk-fill.jsx';
import Background from '../common/background/Background';
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
            <ActionIcon
              variant="white"
              radius="lg"
              size="lg"
              className={css.socialLoginButton}
              onClick={() => mutateLogin.mutate('google')}
              disabled={mutateLogin.isPending}
            >
              <LogosGoogleIcon />
            </ActionIcon>
            <ActionIcon
              variant="white"
              radius="lg"
              size="lg"
              className={css.socialLoginButton}
              onClick={() => mutateLogin.mutate('kakao')}
              disabled={mutateLogin.isPending}
            >
              <RiKakaoTalkFill />
            </ActionIcon>
            <ActionIcon
              variant="white"
              radius="lg"
              size="lg"
              className={css.socialLoginButton}
              onClick={() => mutateLogin.mutate('discord')}
              disabled={mutateLogin.isPending}
            >
              <LogosDiscordIcon />
            </ActionIcon>
          </div>
        </div>
      </div>
    </Background>
  );
}
