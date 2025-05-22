'use client';

import Show from '@/components/common/utils/Show';
import { CodiconClearAll } from '@/icons';
import { useLocale } from '@/libraries/i18n/client';
import { useTranslations } from '@/libraries/i18n/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from '@mantine/core';
import { IconSend2 } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import css from './RequestForm.module.scss';

function ClearButton() {
  const locale = useLocale();
  const { t } = useTranslations();

  const [cleared, setCleared] = useState(false);

  // const [channelName, setChannelName] = useState('');
  // const [channelAddress, setChannelAddress] = useState('');

  // const onChannelNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   setChannelName(e.currentTarget.value);
  // }, []);

  // const onChannelAddressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   setChannelAddress(e.currentTarget.value);
  // }, []);

  // const onSubmit = useCallback(() => {}, [channelName, channelAddress]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setCleared(() => true);

    timerRef.current = setTimeout(() => {
      setCleared(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <Button
      onClick={handleClear}
      variant="outline"
      color={cleared ? 'teal' : 'gray'}
      size="md"
      type="reset"
    >
      <div className={css.buttonInner}>
        <Show when={cleared} fallback={<CodiconClearAll width="1.2rem" height="1.2rem" />}>
          <IconCheck size="1.2rem" />
        </Show>
        <span>{t('global.clearButton.clear')}</span>
      </div>
    </Button>
  );
}

const formDto = z.object({
  channelName: z.string().min(1),
  channelAddress: z.string().min(1).url(),
});

type TForm = z.infer<typeof formDto>;

export default function RequestForm() {
  const { t } = useTranslations();

  const form = useForm<TForm>({
    defaultValues: {
      channelName: '',
      channelAddress: '',
    },
    resolver: zodResolver(formDto),
  });

  const onSubmit = (data: TForm) => {
    try {
      console.log('data', data);

      throw new Error('test');
    } catch (error) {
      console.error(error);
      form.setError('root', { message: error instanceof Error ? error.message : 'example error' });
      //or toast.error("example error")
    }
  };

  return (
    <form className={css.form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className={css.inputs}>
        <Controller
          name="channelName"
          control={form.control}
          render={({ field }) => (
            <TextInput
              {...field}
              label={t('request.requestForm.channelNameInputLabel')}
              placeholder="Ado"
              error={form.formState.errors.channelName?.message}
              required
            />
          )}
        />

        <Controller
          name="channelAddress"
          control={form.control}
          render={({ field }) => (
            <TextInput
              {...field}
              label={t('request.requestForm.channelAddressInputLabel')}
              placeholder="https://www.youtube.com/@Ado1024"
              error={form.formState.errors.channelAddress?.message}
              required
              type="url"
            />
          )}
        />
      </div>

      {form.formState.errors.root && (
        <p className="example">{form.formState.errors.root.message}</p>
      )}

      <div className={css.buttons}>
        <ClearButton />
        <Button variant="filled" size="md" type="submit">
          <div className={css.buttonInner}>
            <IconSend2 width="1.2rem" height="1.2rem" />
            <span>제출</span>
          </div>
        </Button>
      </div>
    </form>
  );
}
