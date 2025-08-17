'use client';
import { ActionIcon, Checkbox } from '@mantine/core';
import clsx from 'clsx';
import { Copy, X } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { CodiconClearAll } from '@/icons';
import { copy, useSetlistActions, useSetlistStore } from './context';
import css from './table.module.scss';

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
      <Copy />
    </ActionIcon>
  );
}

export function TableHeadActions() {
  const { clearChecked, removeChecked } = useSetlistActions();

  return (
    <div className={clsx(css.actionButtons, css.headActionButtons)}>
      <ActionIcon variant="ghost" className={css.actionButton} onClick={clearChecked}>
        <CodiconClearAll />
      </ActionIcon>
      <div className={css.emptyIcon}></div>
      <CopyButton />
      <ActionIcon variant="ghost" className={css.actionButton} onClick={removeChecked}>
        <X />
      </ActionIcon>
    </div>
  );
}
