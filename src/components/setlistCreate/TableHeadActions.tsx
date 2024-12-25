'use client';
import { ActionIcon } from '@mantine/core';
import cx from 'classnames';
import { TbCopy, TbX } from 'react-icons/tb';
import { VscClearAll } from 'react-icons/vsc';
import { toast } from 'sonner';
import { setlistItemToString, useSetlistActions, useSetlistStore } from './Context';
import css from './Table.module.scss';

export default function TableHeadActions() {
  const setlist = useSetlistStore((state) => state.setlist);
  const { clearChecked, removeChecked } = useSetlistActions();

  function copy() {
    const text = setlist
      .filter((item) => item.checked)
      .map((item) => setlistItemToString(item))
      .join('\n');
    navigator.clipboard.writeText(text);
    toast('선택한 세트 리스트를 복사하였습니다');
  }

  return (
    <div className={cx(css.actionButtons, css.headActionButtons)}>
      <ActionIcon variant="ghost" className={css.actionButton} onClick={clearChecked}>
        <VscClearAll />
      </ActionIcon>
      <div className={css.emptyIcon}></div>
      <ActionIcon variant="ghost" className={css.actionButton} onClick={copy}>
        <TbCopy />
      </ActionIcon>
      <ActionIcon variant="ghost" className={css.actionButton} onClick={removeChecked}>
        <TbX />
      </ActionIcon>
    </div>
  );
}
