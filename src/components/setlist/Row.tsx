'use client';
/* eslint-disable @next/next/no-img-element */
import type { Setlist } from '@/libraries/oracleDB/setlist/service';
import { generateThumbnail } from '@/libraries/youtube/url';
import { TChannelData } from '@/types/api/mongoDB';
import { replaceParentheses } from '@/utils/regexp';
import { Table } from '@mantine/core';
import cx from 'classnames';
import dayjs from 'dayjs';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import { type MouseEvent } from 'react';
import { useDrawerActions } from './DrawerContext';
import css from './Table.module.scss';

type RowProps = {
  setlist: Setlist;
  channel?: TChannelData;
  order?: 'broadcast' | 'create';
};

export default function Row({ setlist, channel, order }: RowProps) {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const thumbnailUrl = generateThumbnail(setlist.videoId, 'mqdefault');
  const title = replaceParentheses(setlist.title);
  const create = dayjs(setlist.createdAt).locale(locale).format(t('dayjsTemplate'));
  const broad = dayjs(setlist.broadcastAt).locale(locale).format(t('dayjsTemplate'));
  const drawerActions = useDrawerActions();

  function handleImageClick(e: MouseEvent) {
    e.stopPropagation();
    router.push(`/setlist/${setlist.videoId}`);
  }

  function handleRowClick() {
    drawerActions.open(setlist, thumbnailUrl, channel);
  }

  return (
    <Table.Tr className={css.row} onClick={handleRowClick}>
      <Table.Td className={cx(css.cell, css.thumbnail)}>
        <button className={css.thumbnailButton} onClick={handleImageClick}>
          <div className={css.thumbnailBox}>
            <img src={thumbnailUrl} alt={setlist.title} loading="lazy" />
          </div>
        </button>
      </Table.Td>
      <Table.Td className={cx(css.cell, css.channel)}>
        <p>{channel?.name_kor}</p>
      </Table.Td>
      <Table.Td className={cx(css.cell, css.title)}>
        <p>{title}</p>
      </Table.Td>
      <Table.Td className={cx(css.cell, css.time)}>
        <p>{order ? create : broad}</p>
      </Table.Td>
    </Table.Tr>
  );
}
