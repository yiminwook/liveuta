'use client';
import { Checkbox, TextInput } from '@mantine/core';
import { Reorder, useDragControls } from 'framer-motion';
import { TbGripVertical } from 'react-icons/tb';
import { SetlistItem, timeToString, useSetlistStore } from './Context';
import css from './TableRow.module.scss';

type TableRowProps = {
  item: SetlistItem;
};

export default function TableRow({ item }: TableRowProps) {
  const dragControls = useDragControls();
  const setItemChecked = useSetlistStore((state) => state.setItemChecked);
  const setItemValue = useSetlistStore((state) => state.setItemValue);

  return (
    <Reorder.Item as="tr" className={css.row} value={item} dragControls={dragControls}>
      <td>
        <Checkbox
          checked={item.checked}
          onChange={(e) => setItemChecked(item.id, e.currentTarget.checked)}
        />
      </td>
      <td>{timeToString(item.time)}</td>
      <td>
        <TextInput
          value={item.value}
          onChange={(e) => setItemValue(item.id, e.currentTarget.value)}
        />
      </td>
      <td onPointerDown={(e) => dragControls.start(e)}>
        <TbGripVertical />
      </td>
    </Reorder.Item>
  );
}
