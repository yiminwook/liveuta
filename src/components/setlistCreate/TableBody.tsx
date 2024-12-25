'use client';
import For from '@/components/common/utils/For';
import { hmsToString } from '@/utils/getTime';
import { ActionIcon, Checkbox, Popover, TextInput, UnstyledButton } from '@mantine/core';
import { Reorder, useDragControls } from 'framer-motion';
import type { ChangeEvent, PointerEvent } from 'react';
import { TbClipboard, TbCopy, TbGripVertical, TbX } from 'react-icons/tb';
import { VscClearAll } from 'react-icons/vsc';
import { SetlistItem, setlistItemToString, useSetlistActions, useSetlistStore } from './Context';
import css from './Table.module.scss';

type TableRowProps = {
  item: SetlistItem;
};

function TableRow({ item }: TableRowProps) {
  const dragControls = useDragControls();
  const { removeItem, setItemChecked, setItemTime, setItemValue } = useSetlistActions();

  function handleHourChange(e: ChangeEvent<HTMLInputElement>) {
    setItemTime(item.id, { ...item.time, h: Number.parseInt(e.currentTarget.value) });
  }

  function handleMinuteChange(e: ChangeEvent<HTMLInputElement>) {
    setItemTime(item.id, { ...item.time, m: Number.parseInt(e.currentTarget.value) });
  }

  function handleSecondChange(e: ChangeEvent<HTMLInputElement>) {
    setItemTime(item.id, { ...item.time, s: Number.parseInt(e.currentTarget.value) });
  }

  function handleGripPointerDown(e: PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    dragControls.start(e);
  }

  function clearText() {
    setItemValue(item.id, '');
  }

  function removeRow() {
    removeItem(item.id);
  }

  function paste() {
    navigator.clipboard.readText().then((text) => {
      setItemValue(item.id, text);
    });
  }

  function copy() {
    navigator.clipboard.writeText(setlistItemToString(item));
  }

  return (
    <Reorder.Item as="tr" value={item} dragControls={dragControls} dragListener={false}>
      <td>
        <Checkbox
          checked={item.checked}
          onChange={(e) => setItemChecked(item.id, e.currentTarget.checked)}
        />
      </td>
      <td>
        <div className={css.rowTime}>
          <Popover>
            <Popover.Target>
              <UnstyledButton className={css.popoverTrigger}>
                {hmsToString(item.time)}
              </UnstyledButton>
            </Popover.Target>
            <Popover.Dropdown>
              <div className={css.timePopover}>
                <label className={css.timeInput}>
                  <span>시간</span>
                  <input
                    value={item.time.h}
                    type="number"
                    min={0}
                    max={99}
                    onChange={handleHourChange}
                  />
                </label>
                <label className={css.timeInput}>
                  <span>분</span>
                  <input
                    value={item.time.m}
                    type="number"
                    min={0}
                    max={59}
                    onChange={handleMinuteChange}
                  />
                </label>
                <label className={css.timeInput}>
                  <span>초</span>
                  <input
                    value={item.time.s}
                    type="number"
                    min={0}
                    max={59}
                    onChange={handleSecondChange}
                  />
                </label>
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
      </td>
      <td className={css.rowInput}>
        <TextInput
          value={item.value}
          onChange={(e) => setItemValue(item.id, e.currentTarget.value)}
        />
      </td>
      <td>
        <div className={css.rowActions}>
          <div className={css.actionButtons}>
            <ActionIcon variant="ghost" className={css.actionButton} onClick={clearText}>
              <VscClearAll />
            </ActionIcon>
            <ActionIcon variant="ghost" className={css.actionButton} onClick={paste}>
              <TbClipboard />
            </ActionIcon>
            <ActionIcon variant="ghost" className={css.actionButton} onClick={copy}>
              <TbCopy />
            </ActionIcon>
            <ActionIcon variant="ghost" className={css.actionButton} onClick={removeRow}>
              <TbX />
            </ActionIcon>
          </div>
          <div className={css.rowGrip} onPointerDown={handleGripPointerDown}>
            <TbGripVertical />
          </div>
        </div>
      </td>
    </Reorder.Item>
  );
}

export default function TableBody() {
  const setlist = useSetlistStore((state) => state.setlist);
  const { setSetlist } = useSetlistActions();

  return (
    <Reorder.Group as="tbody" values={setlist} onReorder={setSetlist}>
      <For each={setlist}>{(item) => <TableRow key={item.id} item={item} />}</For>
    </Reorder.Group>
  );
}
