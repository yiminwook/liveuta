'use client';
import { Button, PinInput, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { clientApi } from '@/apis/fetcher';
import { useTranslations } from '@/libraries/i18n/client';
import { VERIFICATION_CODE_EXPIRES_IN } from '@/libraries/oracledb/auth/config';
import { useSession } from '@/stores/session';
import character from '/public/assets/character-3.png';
import Background from '../common/background/Background';
import css from './home.module.scss';

const sendEmailDto = z.object({
  email: z.email({ error: 'signIn.3000' }),
});

export default function Home() {
  const { t } = useTranslations();
  const [sent, setSent] = useState(false);
  const [expireSeconds, setExpireSeconds] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const signIn = useSession((state) => state.actions.signIn);

  const mutateSendVerificationCode = useMutation({
    mutationFn: (args: { email: string }) =>
      clientApi.post<{ message: string }>(`v1/send-verification-code`, { json: args }).json(),
    onError: (error) => toast.error(error.message),
    onSuccess: (_, args) => {
      setSent(() => true);
      setExpireSeconds(() => VERIFICATION_CODE_EXPIRES_IN);
    },
  });

  const mutateSignIn = useMutation({
    mutationFn: (args: { email: string; verificationCode: string }) =>
      clientApi
        .post<{ message: string; data: { session: TSession } }>(`v1/sign-in`, { json: args })
        .json(),
    onError: (error) => toast.error(error.message),
    onSuccess: (json, args) => {
      signIn({ session: json.data.session });
    },
  });

  const onSendVerificationCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mutateSendVerificationCode.isPending) return;
    const validation = sendEmailDto.safeParse({ email });

    if (validation.error) {
      setErrorCode(() => z.treeifyError(validation.error).properties?.email?.errors[0] || '');
      return;
    }

    mutateSendVerificationCode.mutate({ email });
  };

  const resend = () => {
    if (mutateSendVerificationCode.isPending) return;

    const validation = sendEmailDto.safeParse({ email });

    if (validation.error) {
      setErrorCode(() => validation.error.message);
      return;
    }

    mutateSendVerificationCode.mutate({ email });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!sent) return;
    if (mutateSignIn.isPending) return;

    mutateSignIn.mutate({
      email,
      verificationCode,
    });
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\s/g, ''); // 공백 제거
    setEmail(() => value);
    setErrorCode(() => null);
  };

  const onChangeVerificationCode = (value: string) => {
    setVerificationCode(() => value);
    setErrorCode(() => null);
  };

  const reset = () => {
    setSent(() => false);
    setExpireSeconds(() => 0);
    setVerificationCode(() => '');
    setEmail(() => '');
    setErrorCode(() => null);
  };

  const updateExpireSeconds = () => {
    setExpireSeconds((prev) => {
      const next = prev - 1;
      return next <= 0 ? 0 : next;
    });
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

          {!sent ? (
            <form id="send-verification-code-form" onSubmit={onSendVerificationCode}>
              <TextInput
                label={t('signIn.0010')}
                value={email}
                onChange={onChangeEmail}
                placeholder={t('signIn.0003')}
                disabled={mutateSignIn.isPending}
                error={errorCode ? t(errorCode) : undefined}
              />

              <div className={css.buttonBox}>
                <Button
                  type="submit"
                  form="send-verification-code-form"
                  loading={mutateSendVerificationCode.isPending}
                  disabled={errorCode !== null || email.length <= 0}
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
              <label htmlFor="verification-code-input">{t('signIn.0011')}</label>
              <PinInput
                id="verification-code-input"
                value={verificationCode}
                onChange={onChangeVerificationCode}
                length={8}
              />

              <div className={css.resendBox}>
                {expireSeconds > 0 ? (
                  <Timer expiresSeconds={expireSeconds} onUpdate={updateExpireSeconds} />
                ) : (
                  <span className={css.expireText}>{t('signIn.0008')}</span>
                )}

                <Button
                  type="button"
                  onClick={resend}
                  size="compact-sm"
                  loading={mutateSendVerificationCode.isPending}
                >
                  {t('signIn.0006')}
                </Button>
              </div>

              <div className={css.messageBox}>
                <p>{t('signIn.0007', { email })}</p>
              </div>

              <div className={css.buttonBox}>
                <Button type="button" onClick={reset} variant="outline">
                  {t('signIn.0009')}
                </Button>
                <Button
                  type="submit"
                  form="sign-in-form"
                  loading={mutateSignIn.isPending}
                  disabled={expireSeconds <= 0}
                >
                  {t('signIn.0000')}
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
  expiresSeconds: number;
  onUpdate: () => void;
}

function Timer({ expiresSeconds, onUpdate }: TimerProps) {
  const { t } = useTranslations();

  useEffect(() => {
    const interval = setInterval(() => onUpdate(), 1000);
    return () => clearInterval(interval);
  }, []);

  const min = Math.floor(expiresSeconds / 60)
    .toString()
    .padStart(2, '0');

  const sec = (expiresSeconds % 60).toString().padStart(2, '0');

  return <span className={css.expireText}>{t('signIn.0012', { minutes: min, seconds: sec })}</span>;
}
