'use client';
import For from '@/components/common/utils/For';
import Show from '@/components/common/utils/Show';
import { useTranslations } from '@/libraries/i18n/client';
import type { WaitingListItem } from '@/libraries/mongodb/type';
import { Anchor } from '@mantine/core';
import css from './WaitingList.module.scss';

type WaitingListProps = {
  waitingList: WaitingListItem[];
};

export default function WaitingList({ waitingList }: WaitingListProps) {
  const { t } = useTranslations();

  return (
    <div className={css.wrap}>
      <Show when={waitingList.length > 0}>
        <ul className={css.waitingList}>
          <li className={css.waitingListLabel}>
            <span>{t('request.waitingList.channelName')}</span>
            <span>URL</span>
          </li>
          <For each={waitingList}>
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
      <Show when={waitingList.length === 0}>
        <div>대기중인 버튜버가 없습니다.{t('request.waitingList.noWaitingList')}</div>
      </Show>
    </div>
  );
}
