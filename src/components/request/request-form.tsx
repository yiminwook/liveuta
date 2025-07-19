'use client';
import For from '@/components/common/utils/For';
import Show from '@/components/common/utils/Show';
import { CHANNEL_COUNT_TAG, WAITING_TAG } from '@/constants/revalidate-tag';
import {
  useChannelCountSuspenseQuery,
  useSubmitChannelMutation,
  useValidateChannelsMutation,
} from '@/hooks/use-channel-request';
import { useTranslations } from '@/libraries/i18n/client';
import { testYoutubeChannelUrl } from '@/utils/regexp';
import { zodResolver } from '@hookform/resolvers/zod';
import { Anchor, Button, Input, Skeleton, Textarea } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import { Suspense, useCallback, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import parse from 'react-html-parser';
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
  const [alreadyRegistered, setAlreadyRegistered] = useState<TForm['channels']>([]);

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
      if (validateMutation.isPending) return;

      const urls = urlList
        .replaceAll(',', '\n')
        .split('\n')
        .map((u) => u.trim())
        .filter((u) => u.length > 0)
        .filter(testYoutubeChannelUrl);

      validateMutation.mutate(urls, {
        onSuccess: (data) => {
          const results = data.results;

          if (results.length === 0) {
            toast.error(t('request.requestForm.invalidUrlError'));
          } else {
            form.setValue('channels', [
              ...fields,
              ...results
                .filter((item) => item.existingName === '')
                .map((item) => ({
                  nameKor: '',
                  url: item.url,
                  channelId: item.channelId,
                  handle: item.handle,
                })),
            ]);

            setAlreadyRegistered(
              results
                .filter((item) => item.existingName !== '')
                .map((item) => ({
                  nameKor: item.existingName,
                  url: item.url,
                  channelId: item.channelId,
                  handle: item.handle,
                })),
            );
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
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [WAITING_TAG] }),
          queryClient.invalidateQueries({ queryKey: [CHANNEL_COUNT_TAG] }),
        ]);

        form.setValue('channels', []);
        setAlreadyRegistered(() => []);

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
          <Button variant="filled" size="md" type="submit" loading={validateMutation.isPending}>
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
                <li key={`request-channel-${field.channelId}-${index}`} className={css.channel}>
                  <div className={css.channelUrl}>
                    <label className={css.channelFieldLabel}>URL</label>
                    <Input value={field.url} disabled className={css.channelUrl} />
                  </div>
                  <Controller
                    name={`channels.${index}.nameKor`}
                    control={form.control}
                    render={({ field: nameKor }) => (
                      <div className={css.channelName}>
                        <label className={css.channelFieldLabel}>
                          {t('request.requestForm.nameKor')}
                        </label>
                        <Input
                          {...nameKor}
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
                <span>{t('request.requestForm.submitAll')}</span>
              </div>
            </Button>
          </div>
        </form>
      </Show>

      <Show when={alreadyRegistered.length > 0}>
        <div>
          <h4 className={css.registeredChannelsTitle}>
            {t('request.requestForm.registeredChannels')}
          </h4>
        </div>

        <ul className={css.registeredChannels}>
          <For each={alreadyRegistered}>
            {(item, index) => (
              <li key={`registered-${item.channelId}-${index}`} className={css.channel}>
                <div className={css.channelUrl}>
                  <label className={css.channelFieldLabel}>URL</label>
                  <Input value={item.url} disabled className={css.channelUrl} />
                </div>
                <div className={css.channelName}>
                  <label className={css.channelFieldLabel}>
                    {t('request.requestForm.nameKor')}
                  </label>
                  <Input value={item.nameKor} disabled className={css.channelUrl} />
                </div>
              </li>
            )}
          </For>
        </ul>
      </Show>

      <div className={css.description}>
        <Suspense fallback={<Skeleton ml="auto" height={16} width={200} />}>
          <ChannelCountTextBox />
        </Suspense>

        <p>{t('request.requestForm.description')}</p>
        <p>
          {parse(t('request.requestForm.description2'), {
            transform: (node, index) => {
              if (node.type === 'tag' && node.name === 'a' && node.children?.[0]?.data) {
                return (
                  <Anchor
                    key={index}
                    href="https://gall.dcinside.com/mini/board/view/?id=vuta&no=114373"
                  >
                    {node.children[0].data}
                  </Anchor>
                );
              }
            },
          })}
        </p>
      </div>
    </div>
  );
}

function ChannelCountTextBox() {
  const { t } = useTranslations();
  const { data: channelCount } = useChannelCountSuspenseQuery();

  return <p>{parse(t('request.requestForm.channelCount', { count: channelCount || 0 }))}</p>;
}
