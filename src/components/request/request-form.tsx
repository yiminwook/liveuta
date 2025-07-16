'use client';
import For from '@/components/common/utils/For';
import Show from '@/components/common/utils/Show';
import { useSubmitChannelMutation, useValidateChannelsMutation } from '@/hooks/use-proxy';
import { useTranslations } from '@/libraries/i18n/client';
import { testYoutubeChannelUrl } from '@/utils/regexp';
import { zodResolver } from '@hookform/resolvers/zod';
import { Anchor, Button, Input, Textarea } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import css from './request-form.module.scss';

const formDto = z.object({
  channels: z.array(
    z.object({
      nameKor: z.string().min(1),
      url: z.string().min(1).url(),
      channelId: z.string().min(1),
      handle: z.string().min(1),
    }),
  ),
});

type TForm = z.infer<typeof formDto>;

export default function RequestForm() {
  const { t } = useTranslations();
  const queryClient = useQueryClient();

  const [urlList, setUrlList] = useState('');

  const form = useForm<TForm>({
    defaultValues: {
      channels: [],
    },
    resolver: zodResolver(formDto),
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: 'channels',
  });

  const validateMutation = useValidateChannelsMutation();
  const submitMutation = useSubmitChannelMutation();

  const onDuplicateTest = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const urls = urlList
        .split('\n')
        .map((u) => u.trim())
        .filter((u) => u.length > 0)
        .filter(testYoutubeChannelUrl);

      validateMutation.mutate(urls, {
        onSuccess: (data) => {
          const results = data.results;
          if (results.length === 0) {
            toast.error(t('request.requestForm.noValidUrl'));
          } else {
            form.setValue('channels', [
              ...fields,
              ...results.map((item) => ({
                nameKor: '',
                url: item.url,
                channelId: item.channelId,
                handle: item.handle,
              })),
            ]);
          }
        },
        onError: (error) => toast.error(error.message),
      });
    },
    [urlList],
  );

  const onSubmit = (data: TForm) => {
    if (submitMutation.isPending) return;

    submitMutation.mutate(data.channels, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['waitingList'] });

        form.setValue('channels', []);

        toast.success(t('request.requestForm.submitSuccess'));
      },
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <div>
      <form className={css.form} onSubmit={onDuplicateTest}>
        <Textarea
          rows={8}
          placeholder="https://www.youtube.com/@Ado1024"
          value={urlList}
          onChange={(e) => setUrlList(e.currentTarget.value)}
        />
        <div className={css.buttons}>
          <Button variant="filled" size="md" type="submit">
            {t('request.requestForm.validate')}
          </Button>
        </div>
      </form>
      <Show when={fields.length > 0}>
        <form className={css.channelsForm} onSubmit={form.handleSubmit(onSubmit)}>
          <div className={css.channelsLabel}>
            <div>
              <span>URL</span>
            </div>
            <div>
              <span>{t('request.requestForm.nameKor')}</span>
            </div>
          </div>
          <ul className={css.channels}>
            <For each={fields}>
              {(field, index) => (
                <li key={`request-channel-${field.channelId}`} className={css.channel}>
                  <div className={css.channelUrl}>
                    <label className={css.channelFieldLabel}>URL</label>
                    <Input value={field.url} disabled className={css.channelUrl} />
                  </div>
                  <Controller
                    name={`channels.${index}.nameKor`}
                    control={form.control}
                    render={({ field }) => (
                      <div className={css.channelName}>
                        <label className={css.channelFieldLabel}>
                          {t('request.requestForm.nameKor')}
                        </label>
                        <Input
                          {...field}
                          placeholder="Ado"
                          error={form.formState.errors.channels?.[index]?.nameKor?.message}
                          required
                          className={css.channelUrl}
                        />
                      </div>
                    )}
                  />
                </li>
              )}
            </For>
          </ul>
          <div className={css.buttons}>
            <Button variant="filled" size="md" type="submit" loading={submitMutation.isPending}>
              <div className={css.buttonInner}>
                <Send width="1.2rem" height="1.2rem" />
                <span>{t('request.requestForm.submit')}</span>
              </div>
            </Button>
          </div>
        </form>
      </Show>
      <div className={css.description}>
        <p>실제 일정표에 반영되기까지 약 1일 이내의 간격이 있을 수 있습니다.</p>
        <p>
          오·탈자 등으로 인해 수정이 필요한 경우{' '}
          <Anchor href="https://gall.dcinside.com/mini/board/view/?id=vuta&no=114373">
            갤러리
          </Anchor>
          에 알려주세요.
        </p>
      </div>
    </div>
  );
}
