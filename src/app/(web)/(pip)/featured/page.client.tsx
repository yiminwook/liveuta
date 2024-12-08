'use client';
import Categories from '@/components/common/featured/Categories';
import FeaturedSelect from '@/components/common/featured/FeaturedSelect';
import FeaturedVtubers from '@/components/common/featured/FeaturedVtubers';
import { featuredAtom } from '@/stores/schedule/featured';
import { useAtom } from 'jotai';
import { Session } from 'next-auth';
import * as styles from './page.css';

type Props = {
  session: Session | null;
};

export default function Client({ session }: Props) {
  const [selected, setSelected] = useAtom(featuredAtom);

  return (
    <section className={styles.featuredContainer}>
      {/* <Tabs.Root
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
      </Tabs.Root> */}
      <div className={styles.featured} data-show={selected}>
        <div>
          <FeaturedSelect />
        </div>
        <Categories session={session} />
        <FeaturedVtubers />
      </div>
    </section>
  );
}
