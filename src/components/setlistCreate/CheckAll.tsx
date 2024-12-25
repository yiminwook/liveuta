'use client';

import { Checkbox } from '@mantine/core';
import { useSetlistStore } from './Context';

export default function CheckAll() {
  const allChecked = useSetlistStore((state) => state.setlistAllChecked);
  const { checkAll } = useSetlistStore((state) => state.actions);

  return <Checkbox checked={allChecked} onChange={(e) => checkAll(e.currentTarget.checked)} />;
}
