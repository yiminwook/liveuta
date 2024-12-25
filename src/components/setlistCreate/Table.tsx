'use client';

import For from '@/components/common/utils/For';
import { Checkbox } from '@mantine/core';
import { Reorder } from 'framer-motion';
import { useSetlistStore } from './Context';
import css from './Table.module.scss';
import TableRow from './TableRow';

export default function Table() {
  const setlist = useSetlistStore((state) => state.setlist);
  const allChecked = useSetlistStore((state) => state.setlistAllChecked);
  const { checkAll, setSetlist } = useSetlistStore((state) => state.actions);

  return (
    <>
      <table className={css.table}>
        <thead>
          <tr>
            <th>
              <Checkbox checked={allChecked} onChange={(e) => checkAll(e.currentTarget.checked)} />
            </th>
            <th>시간</th>
            <th>텍스트</th>
            <th />
          </tr>
        </thead>
        <Reorder.Group as="tbody" className={css.body} values={setlist} onReorder={setSetlist}>
          <For each={setlist}>{(item) => <TableRow key={item.id} item={item} />}</For>
        </Reorder.Group>
      </table>
    </>
  );
}
