'use client';
import CodiconClearAll from '@/icons/codicon-clear-all.svg?react';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { hmsToString } from '@/utils/time';
import { ActionIcon, Checkbox, Popover, TextInput, UnstyledButton } from '@mantine/core';
import { IconClipboard, IconCopy, IconGripVertical, IconX } from '@tabler/icons-react';
import { Reorder, useDragControls } from 'framer-motion';
import type { PointerEvent } from 'react';
import { SetlistItem, copy, useSetlistActions } from './Context';
import css from './Table.module.scss';

type TableRowProps = {
  item: SetlistItem;
};

export default function TableRow({ item }: TableRowProps) {
  const { t } = useTranslations();
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
                  <span>{t('setlistCreate.table.hour')}</span>
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
                  <span>{t('setlistCreate.table.minute')}</span>
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
                  <span>{t('setlistCreate.table.second')}</span>
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
              <CodiconClearAll />
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
              <IconClipboard />
            </ActionIcon>
            <ActionIcon variant="ghost" className={css.actionButton} onClick={() => copy([item])}>
              <IconCopy />
            </ActionIcon>
            <ActionIcon
              variant="ghost"
              className={css.actionButton}
              onClick={() => removeItem(item.id)}
            >
              <IconX />
            </ActionIcon>
          </div>
          <div className={css.rowGrip} onPointerDown={handleGripPointerDown}>
            <IconGripVertical />
          </div>
        </div>
      </td>
    </Reorder.Item>
  );
}
