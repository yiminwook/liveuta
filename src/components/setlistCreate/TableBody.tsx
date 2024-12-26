'use client';
import For from '@/components/common/utils/For';
import { Reorder } from 'framer-motion';
import { useSetlistActions, useSetlistStore } from './Context';

export default function TableBody() {
  const setlist = useSetlistStore((state) => state.setlist);
  const { setSetlist } = useSetlistActions();

  return (
    <Reorder.Group as="tbody" values={setlist} onReorder={setSetlist}>
      <For each={setlist}>{(item) => <IconTbTableRow key={item.id} item={item} />}</For>
    </Reorder.Group>
  );
}
