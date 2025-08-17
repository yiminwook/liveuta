'use client';
import { Reorder } from 'motion/react';
import For from '@/components/common/utils/For';
import { useSetlistActions, useSetlistStore } from './context';
import TableRow from './table-row';

export default function TableBody() {
  const setlist = useSetlistStore((state) => state.setlist);
  const { setSetlist } = useSetlistActions();

  return (
    <Reorder.Group as="tbody" values={setlist} onReorder={setSetlist}>
      <For each={setlist}>{(item) => <TableRow key={item.id} item={item} />}</For>
    </Reorder.Group>
  );
}
