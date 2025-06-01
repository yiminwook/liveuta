'use client';
import Show from '@/components/common/utils/Show';
import { useAutoCompleteQuery, useSubmitChannelMutation } from '@/hooks/use-proxy';
import { CodiconClearAll } from '@/icons';
import { useTranslations } from '@/libraries/i18n/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Anchor, Button } from '@mantine/core';
import { Autocomplete } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { Check, Send } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import css from './request-form.module.scss';

function ClearButton() {
  const { t } = useTranslations();

  const [cleared, setCleared] = useState(false);

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
          <Check size="1.2rem" />
        </Show>
        <span>{t('global.clearButton.clear')}</span>
      </div>
    </Button>
  );
}

const formDto = z.object({
  channelName: z.string().min(1),
  channelURL: z.string().min(1).url(),
});

type TForm = z.infer<typeof formDto>;

export default function RequestForm() {
  const { t } = useTranslations();
  const queryClient = useQueryClient();

  const form = useForm<TForm>({
    defaultValues: {
      channelName: '',
      channelURL: '',
    },
    resolver: zodResolver(formDto),
  });

  const { data: autoCompleteData } = useAutoCompleteQuery();

  const mutation = useSubmitChannelMutation();

  const onSubmit = (data: TForm) => {
    if (mutation.isPending) return;
    mutation.mutate(data, {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['autoComplete'] }),
          queryClient.invalidateQueries({ queryKey: ['waitingList'] }),
        ]);

        form.reset();
        toast.success(t('request.requestForm.submitSuccess'));
      },
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <form className={css.form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className={css.inputs}>
        <Controller
          name="channelName"
          control={form.control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              label={t('request.requestForm.channelNameInputLabel')}
              placeholder="Ado"
              error={form.formState.errors.channelName?.message}
              required
              data={autoCompleteData?.nameList}
              limit={100}
            />
          )}
        />

        <Controller
          name="channelURL"
          control={form.control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              label={t('request.requestForm.channelAddressInputLabel')}
              placeholder="https://www.youtube.com/@Ado1024"
              error={form.formState.errors.channelURL?.message}
              required
              type="url"
              data={autoCompleteData?.urlList}
              limit={100}
            />
          )}
        />
      </div>

      <div className={css.buttons}>
        <ClearButton />
        <Button variant="filled" size="md" type="submit" loading={mutation.isPending}>
          <div className={css.buttonInner}>
            <Send width="1.2rem" height="1.2rem" />
            <span>{t('request.requestForm.submit')}</span>
          </div>
        </Button>
      </div>

      <div className={css.description}>
        <p>
          현재 <b>{autoCompleteData?.urlList.length ?? 0}</b>개의 채널이 등록되어 있습니다.
        </p>
        <p>실제 일정표에 반영되기까지 약 1일 이내의 간격이 있을 수 있습니다.</p>
        <p>
          오·탈자 등으로 인해 수정이 필요한 경우{' '}
          <Anchor href="https://gall.dcinside.com/mini/board/view/?id=vuta&no=114373">
            갤러리
          </Anchor>
          에 알려주세요.
        </p>
      </div>
    </form>
  );
}
