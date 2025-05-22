'use client';
import For from '@/components/common/utils/For';
import Show from '@/components/common/utils/Show';
import { useWaitingListSuspenseQuery } from '@/hooks/use-proxy';
import { useTranslations } from '@/libraries/i18n/client';
import { Anchor } from '@mantine/core';
import css from './waiting-list.module.scss';

export default function WaitingList() {
  const { t } = useTranslations();

  const { data } = useWaitingListSuspenseQuery();

  return (
    <div className={css.wrap}>
      <Show when={data.length > 0}>
        <ul className={css.waitingList}>
          <li className={css.waitingListLabel}>
            <span>{t('request.waitingList.channelName')}</span>
            <span>URL</span>
          </li>
          <For each={data}>
            {(item, index) => {
              return (
                <li key={`waiting-list-${index}`} className={css.waitingItem}>
                  <div>
                    <span className={css.channelName}>{item.name_kor}</span>
                  </div>
                  <Anchor href={item.channel_addr} target="_blank">
                    {item.channel_addr}
                  </Anchor>
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
