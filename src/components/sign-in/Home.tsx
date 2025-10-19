'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { clientApi } from '@/apis/fetcher';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { signInDto, TSignInDto } from '@/types/dto';
import character from '/public/assets/character-3.png';
import Background from '../common/background/Background';
import css from './Home.module.scss';

export default function Home() {
  const { t } = useTranslations();
  const locale = useLocale();

  const form = useForm<TSignInDto>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      callbackUrl: '/',
      locale,
    },
    resolver: zodResolver(signInDto),
  });

  const mutateLogin = useMutation({
    mutationFn: (args: TSignInDto) =>
      clientApi.post<{ message: string }>(`v1/sign-in`, { json: args }).json(),
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success(t('signIn.3000')),
  });

  const onSubmit = (data: TSignInDto) => {
    if (mutateLogin.isPending) return;

    mutateLogin.mutate(data);
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

          <form
            id="sign-in-form"
            onSubmit={form.handleSubmit(onSubmit, (errors) =>
              console.error('sign-in errors', errors),
            )}
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, formState }) => (
                <TextInput
                  {...field}
                  placeholder={t('signIn.0003')}
                  error={formState.errors.email?.message}
                />
              )}
            />
          </form>

          <div className={css.buttonBox}>
            <Button type="submit" loading={mutateLogin.isPending} form="sign-in-form">
              {t('signIn.0004')}
            </Button>
          </div>

          <div className={css.messageBox}>
            <p>{t('signIn.0005')}</p>
          </div>
        </div>
      </div>
    </Background>
  );
}
