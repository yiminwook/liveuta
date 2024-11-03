import { Session } from 'next-auth';
import { useAtom } from 'jotai';
import { Tabs } from '@ark-ui/react';

import { featuredAtom } from '@/stores/schedule/featured';
import Categories from './featured/Categories';
import FeaturedVtubers from './featured/FeaturedVtubers';

import * as styles from './featured.css';

type FeaturedProps = {
  session: Session | null;
  filter: string;
};

export default function Featured({ session, filter }: FeaturedProps) {
  const [selected, setSelected] = useAtom(featuredAtom);

  return (
    <section className={styles.featuredContainer}>
      <Tabs.Root
        lazyMount
        unmountOnExit
        value={selected}
        onValueChange={(e) => setSelected(e.value as 'categories' | 'vtubers')}
      >
        <Tabs.List className={styles.tabs}>
          <Tabs.Trigger
            value="categories"
            className={styles.tab}
            data-selected={selected === 'categories'}
          >
            <span>카테고리</span>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="vtubers"
            className={styles.tab}
            data-selected={selected === 'vtubers'}
          >
            <span>버튜버 특집</span>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <div className={styles.featured} data-show={selected}>
        <Categories session={session} filter={filter} />
        <FeaturedVtubers />
      </div>
    </section>
  );
}
