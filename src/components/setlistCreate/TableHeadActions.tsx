'use client';
import CodiconClearAll from '@icons/codicon/ClearAll';
import TbCopy from '@icons/tabler/Copy';
import TbX from '@icons/tabler/X';
import { ActionIcon } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import cx from 'classnames';
import { useShallow } from 'zustand/react/shallow';
import { copy, useSetlistActions, useSetlistStore } from './Context';
import css from './Table.module.scss';

export function CheckAll() {
  const allChecked = useSetlistStore((state) => state.setlistAllChecked);
  const { checkAll } = useSetlistStore((state) => state.actions);

  return <Checkbox checked={allChecked} onChange={(e) => checkAll(e.currentTarget.checked)} />;
}

function CopyButton() {
  const setlist = useSetlistStore(useShallow((state) => state.setlist));

  return (
    <ActionIcon
      variant="ghost"
      className={css.actionButton}
      onClick={() => copy(setlist.filter((item) => item.checked))}
    >
      <TbCopy />
    </ActionIcon>
  );
}

export function TableHeadActions() {
  const { clearChecked, removeChecked } = useSetlistActions();

  return (
    <div className={cx(css.actionButtons, css.headActionButtons)}>
      <ActionIcon variant="ghost" className={css.actionButton} onClick={clearChecked}>
        <CodiconClearAll />
      </ActionIcon>
      <div className={css.emptyIcon}></div>
      <CopyButton />
      <ActionIcon variant="ghost" className={css.actionButton} onClick={removeChecked}>
        <TbX />
      </ActionIcon>
    </div>
  );
}
