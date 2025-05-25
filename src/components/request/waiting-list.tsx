'use client';
import For from '@/components/common/utils/For';
import Show from '@/components/common/utils/Show';
import { useWaitingListSuspenseQuery } from '@/hooks/use-proxy';
import { useTranslations } from '@/libraries/i18n/client';
import { Anchor, Skeleton } from '@mantine/core';
import { Suspense } from 'react';
import css from './waiting-list.module.scss';

export default function WaitingList() {
  return (
    <Suspense fallback={<Loading />}>
      <Success />
    </Suspense>
  );
}

function Success() {
  const { t } = useTranslations();

  const { data } = useWaitingListSuspenseQuery();

  return (
    <div className={css.wrap}>
      <Show when={data.length > 0}>
        <ul className={css.waitingList}>
          <li className={css.waitingListLabel}>
            <div data-label="name">
              <span>{t('request.waitingList.channelName')}</span>
            </div>
            <div data-label="url">
              <span>URL</span>
            </div>
          </li>
          <For each={data}>
            {(item, index) => {
              return (
                <li key={`waiting-list-${index}`} className={css.waitingItem}>
                  <div data-label="name">
                    <span className={css.channelName}>{item.name_kor}</span>
                  </div>
                  <div data-label="url" className={css.one}>
                    <Anchor href={item.channel_addr} target="_blank">
                      {item.channel_addr}
                    </Anchor>
                  </div>
                </li>
              );
            }}
          </For>
        </ul>
      </Show>
      <Show when={data.length === 0}>
        <div>{t('request.waitingList.noWaitingList')}</div>
      </Show>
    </div>
  );
}

function Loading() {
  const { t } = useTranslations();

  return (
    <div className={css.wrap}>
      <ul className={css.waitingList}>
        <li className={css.waitingListLabel}>
          <div data-label="name">
            <span>{t('request.waitingList.channelName')}</span>
          </div>
          <div data-label="url">
            <span>URL</span>
          </div>
        </li>
        <For each={Array(5).fill(null)}>
          {(item, index) => {
            return (
              <li key={`waiting-list-${index}`} className={css.waitingItem}>
                <div data-label="name">
                  <Skeleton h={16} w={100} mx="auto" />
                </div>
                <div data-label="url">
                  <Skeleton h={16} w="100%" mx="auto" />
                </div>
              </li>
            );
          }}
        </For>
      </ul>
    </div>
  );
}
