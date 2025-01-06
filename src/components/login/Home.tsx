'use client';
import character from '@/assets/image/character-3.png';
import { Provider } from '@/types/nextAuth';
import LogosDiscordIcon from '@icons/logos/DiscordIcon';
import LogosGoogleIcon from '@icons/logos/GoogleIcon';
import RiKakaoTalkFill from '@icons/ri/KakaoTalkFilled';
import { ActionIcon } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { toast } from 'sonner';
import Background from '../common/background/Background';
import css from './Home.module.scss';

export default function Home() {
  const t = useTranslations('auth.login');
  const mutateLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: (provider: Provider) => signIn(provider, { callbackUrl: '/' }),
    onError: (error) => toast.error(error.message),
  });

  return (
    <Background>
      <div className={css.wrap}>
        <h1 className="blind">{t('loginPage')}</h1>
        <div className={css.inner}>
          <div className={css.imgBox}>
            <Image
              src={character}
              width={200}
              height={300}
              alt={t('imageAlt')}
              unoptimized={true}
            />
          </div>
          <p>{t('startWithSocial')}</p>
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
