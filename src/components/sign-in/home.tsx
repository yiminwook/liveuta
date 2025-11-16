'use client';
import { Button, PinInput, TextInput } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { clientApi } from '@/apis/fetcher';
import dayjs from '@/libraries/dayjs';
import { useTranslations } from '@/libraries/i18n/client';
import { useSession } from '@/stores/session';
import character from '/public/assets/character-3.png';
import Background from '../common/background/Background';
import css from './home.module.scss';

export default function Home() {
  const queryClient = useQueryClient();
  const { t } = useTranslations();
  const [sentTime, setSentTime] = useState<dayjs.Dayjs | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');

  const session = useSession();
  const signIn = useSession((state) => state.actions.signIn);
  console.log('session', session);

  const mutateSendVerificationCode = useMutation({
    mutationFn: (args: { email: string }) =>
      clientApi.post<{ message: string }>(`v1/send-verification-code`, { json: args }).json(),
    onError: (error) => toast.error(error.message),
    onSuccess: (_, args) => {
      setSentTime(() => dayjs().add(10, 'minutes'));
    },
  });

  const mutateLogin = useMutation({
    mutationFn: (args: { email: string; verificationCode: string }) =>
      clientApi
        .post<{ message: string; data: { session: TSession } }>(`v1/sign-in`, { json: args })
        .json(),
    onError: (error) => toast.error(error.message),
    onSuccess: (json, args) => {
      console.log('signin success', json);
      signIn({ session: json.data.session });
      // queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });

  const onSendVerificationCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mutateSendVerificationCode.isPending) return;
    mutateSendVerificationCode.mutate({ email });
  };

  const resend = () => {
    if (mutateSendVerificationCode.isPending) return;
    mutateSendVerificationCode.mutate({ email });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!sentTime) return;
    if (mutateLogin.isPending) return;

    mutateLogin.mutate({
      email,
      verificationCode,
    });
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(() => event.target.value);
  };

  const onChangeVerificationCode = (value: string) => {
    setVerificationCode(() => value);
  };

  const reset = () => {
    setSentTime(() => null);
    setVerificationCode(() => '');
    setEmail(() => '');
  };

  return (
    <Background>
      <div className={css.wrap}>
        <h1 className="blind">{t('signIn.0001')}</h1>
        <div className={css.inner}>
          <div className={css.imgBox}>
            <Image
              src={character}
              width={200}
              height={300}
              alt={t('signIn.0002')}
              unoptimized={true}
            />
          </div>

          {sentTime === null ? (
            <form id="send-verification-code-form" onSubmit={onSendVerificationCode}>
              <TextInput
                value={email}
                onChange={onChangeEmail}
                placeholder={t('signIn.0003')}
                disabled={mutateLogin.isPending}
              />

              <div className={css.buttonBox}>
                <Button
                  type="submit"
                  loading={mutateSendVerificationCode.isPending}
                  form="send-verification-code-form"
                >
                  {t('signIn.0004')}
                </Button>
              </div>

              <div className={css.messageBox}>
                <p>{t('signIn.0005')}</p>
              </div>
            </form>
          ) : (
            <form id="sign-in-form" onSubmit={onSubmit}>
              <PinInput value={verificationCode} onChange={onChangeVerificationCode} length={8} />

              <div className={css.messageBox}>
                <p>{t('signIn.0007', { email })}</p>

                <div>
                  <Timer sentTime={sentTime} />
                  <Button type="button" onClick={resend}>
                    {t('signIn.0006')}
                  </Button>
                </div>
              </div>

              <div>
                <Button type="button" onClick={reset}>
                  이전
                </Button>
                <Button type="submit" form="sign-in-form" loading={mutateLogin.isPending}>
                  로그인
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Background>
  );
}

interface TimerProps {
  sentTime: dayjs.Dayjs;
}

function Timer({ sentTime }: TimerProps) {
  const now = dayjs();
  const [seconds, setSeconds] = useState(() => now.diff(sentTime, 'seconds'));

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(() => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');

  return (
    <div>
      {min}:{sec}
    </div>
  );
}
