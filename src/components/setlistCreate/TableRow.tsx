'use client';
import { hmsToString } from '@/utils/getTime';
import { ActionIcon, Checkbox, Popover, TextInput, UnstyledButton } from '@mantine/core';
import { Reorder, useDragControls } from 'framer-motion';
import type { PointerEvent } from 'react';
import { SetlistItem, copy, useSetlistActions } from './Context';
import css from './Table.module.scss';

type TableRowProps = {
  item: SetlistItem;
};

export default function TableRow({ item }: TableRowProps) {
  const dragControls = useDragControls();
  const { removeItem, setItemChecked, setItemTime, setItemValue } = useSetlistActions();

  function handleGripPointerDown(e: PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    dragControls.start(e);
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
                    onChange={(e) =>
                      setItemTime(item.id, {
                        ...item.time,
                        h: Number.parseInt(e.currentTarget.value),
                      })
                    }
                  />
                </label>
                <label className={css.timeInput}>
                  <span>분</span>
                  <input
                    value={item.time.m}
                    type="number"
                    min={0}
                    max={59}
                    onChange={(e) =>
                      setItemTime(item.id, {
                        ...item.time,
                        m: Number.parseInt(e.currentTarget.value),
                      })
                    }
                  />
                </label>
                <label className={css.timeInput}>
                  <span>초</span>
                  <input
                    value={item.time.s}
                    type="number"
                    min={0}
                    max={59}
                    onChange={(e) =>
                      setItemTime(item.id, {
                        ...item.time,
                        s: Number.parseInt(e.currentTarget.value),
                      })
                    }
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
            <ActionIcon
              variant="ghost"
              className={css.actionButton}
              onClick={() => setItemValue(item.id, '')}
            >
              <IconCodiconClearAll />
            </ActionIcon>
            <ActionIcon
              variant="ghost"
              className={css.actionButton}
              onClick={() => {
                navigator.clipboard.readText().then((text) => {
                  setItemValue(item.id, text);
                });
              }}
            >
              <IconTbClipboard />
            </ActionIcon>
            <ActionIcon variant="ghost" className={css.actionButton} onClick={() => copy([item])}>
              <IconTbCopy />
            </ActionIcon>
            <ActionIcon
              variant="ghost"
              className={css.actionButton}
              onClick={() => removeItem(item.id)}
            >
              <IconTbX />
            </ActionIcon>
          </div>
          <div className={css.rowGrip} onPointerDown={handleGripPointerDown}>
            <IconTbGripVertical />
          </div>
        </div>
      </td>
    </Reorder.Item>
  );
}
